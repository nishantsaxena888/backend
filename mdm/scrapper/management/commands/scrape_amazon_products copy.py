from django.core.management.base import BaseCommand
from django.db import connection, close_old_connections
from scrapper.models import Item
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time, re, hashlib, os, json
from scrapper.management.commands.common_image_utils import download_image
from django.db.models import TextField
import urllib.parse
import requests


# ---------------------------------------------------
# CLEAN AMAZON URL → Always DP Link
# ---------------------------------------------------
def clean_amazon_url(url):
    """Convert messy Amazon URLs into clean https://www.amazon.in/dp/ASIN"""
    if not url or not isinstance(url, str):
        return url

    # 1) unwrap redirect URLs
    if "sspa/click" in url or "spc/click" in url:
        try:
            parsed = urllib.parse.urlparse(url)
            qs = urllib.parse.parse_qs(parsed.query)
            if "url" in qs:
                url = qs["url"][0]
        except:
            pass

    # 2) extract ASIN
    m = re.search(r"/dp/([A-Z0-9]{10})", url)
    if m:
        asin = m.group(1)
        return f"https://www.amazon.in/dp/{asin}"

    m = re.search(r"/gp/product/([A-Z0-9]{10})", url)
    if m:
        asin = m.group(1)
        return f"https://www.amazon.in/dp/{asin}"

    # 3) strip params
    try:
        url = url.split("?")[0].split("#")[0]
    except:
        pass

    return url


# ---------------------------------------------------
# HELPERS
# ---------------------------------------------------
def clean_price(price_text):
    if not price_text:
        return None
    try:
        clean = re.sub(r"[^\d.]", "", price_text)
        return float(clean) if clean else None
    except:
        return None


def clean_item_code(raw_code):
    if not raw_code:
        return "UNKNOWN"
    return re.sub(r'[^A-Za-z0-9_-]', '', raw_code)


def sync_postgres_sequence(table_name="item", pk_field="id"):
    with connection.cursor() as cursor:
        cursor.execute(f"""
            SELECT setval(
                pg_get_serial_sequence('{table_name}', '{pk_field}'),
                COALESCE((SELECT MAX({pk_field}) FROM {table_name}), 1)
            );
        """)


# ---------------------------------------------------
# Robust wrapper around download_image with retries
# ---------------------------------------------------
def download_image_retry(url, source, item_code, attempts=3, backoff=2):
    if not url:
        return None

    for attempt in range(1, attempts + 1):
        try:
            # If download_image already implements retries, this is still safe
            return download_image(url, source, item_code)
        except requests.exceptions.RequestException as e:
            print(f"❌ Image request error (attempt {attempt}/{attempts}): {e}")
        except Exception as e:
            print(f"❌ Image handling error (attempt {attempt}/{attempts}): {e}")

        if attempt < attempts:
            time.sleep(backoff * attempt)

    print(f"❌ Failed to download image after {attempts} attempts: {url}")
    return None


# ---------------------------------------------------
# MAIN SCRAPER COMMAND
# ---------------------------------------------------
class Command(BaseCommand):
    help = "Scrape Amazon product pages and store into Item model with local images"

    def add_arguments(self, parser):
        parser.add_argument("--file", type=str, required=True, help="Excel file with URLs")
        parser.add_argument("--headless", action="store_true", default=False)

    def handle(self, *args, **kwargs):
        file_path = kwargs["file"]
        headless = kwargs["headless"]

        # ---------------------------------------------------
        # LOAD EXCEL + detect correct column
        # ---------------------------------------------------
        df = pd.read_excel(file_path)

        if "amazon_url" in df.columns:
            url_col = "amazon_url"
        elif "Unnamed: 13" in df.columns:
            url_col = "Unnamed: 13"
        else:
            raise ValueError(
                f"No valid URL column found. Excel columns: {list(df.columns)}"
            )

        urls = df[url_col].dropna().astype(str).tolist()

        # Clean + filter Amazon URLs
        urls = [
            clean_amazon_url(u)
            for u in urls
            if u and "amazon" in u.lower()
        ]

        self.stdout.write(self.style.SUCCESS(f"✅ Loaded {len(urls)} Amazon URLs."))

        # ---------------------------------------------------
        # CHROME OPTIONS
        # ---------------------------------------------------
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument("--headless=new")

        options.add_argument("--disable-gpu")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-software-rasterizer")
        options.add_argument("--window-size=1400,1000")

        driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=options
        )

        sync_postgres_sequence()

        total = len(urls)

        # ---------------------------------------------------
        # SCRAPE EACH PRODUCT
        # ---------------------------------------------------
        for idx, url in enumerate(urls, start=1):

            print(f"\n[{idx}/{total}] Scraping: {url}")

            # Ensure DB connections are fresh before each DB access
            try:
                close_old_connections()
            except Exception:
                pass

            # Load URL
            try:
                driver.get(url)
            except Exception as e:
                print("❌ Could not load URL:", e)
                continue

            time.sleep(1.3)

            # ---------------------------------------------------
            # CHECK DUPLICATE (robust)
            # ---------------------------------------------------
            try:
                close_old_connections()
                exists = Item.objects.filter(amazon_url=url).exists()
            except Exception as e:
                print("⚠ DB check failed — retrying after closing connections:", e)
                try:
                    close_old_connections()
                    exists = Item.objects.filter(amazon_url=url).exists()
                except Exception as e2:
                    print("❌ DB still failing — skipping this URL:", e2)
                    continue

            if exists:
                print("⏩ Skipped — already exists:", url)
                continue

            # ---------------------------------------------------
            # Handle Search Result Page
            # ---------------------------------------------------
            if "amazon.in/s?k=" in url:
                try:
                    print("🟡 Search page detected → Opening first product...")
                    first = driver.find_element(
                        By.CSS_SELECTOR,
                        "div.s-main-slot div[data-component-type='s-search-result'] h2 a"
                    )
                    product_url = clean_amazon_url(first.get_attribute("href"))
                    print("🔗 Product:", product_url)
                    driver.get(product_url)
                    time.sleep(1.2)
                    url = product_url  # update cleaned product url
                except Exception as e:
                    print("⚠ No product found — skipping", e)
                    continue

            # Safe getter
            def safe_get(by, value, attr="text"):
                try:
                    elem = driver.find_element(by, value)
                    return elem.get_attribute(attr).strip() if attr != "text" else elem.text.strip()
                except:
                    return None

            # ---------------------------------------------------
            # Extract ASIN
            # ---------------------------------------------------
            asin_match = re.search(r"/dp/([A-Z0-9]{10})", driver.current_url)
            asin = asin_match.group(1) if asin_match else None

            # ---------------------------------------------------
            # Extract Core Product Data
            # ---------------------------------------------------
            title = safe_get(By.ID, "productTitle")
            if not title or len(title.strip()) < 3:
                print("❌ Skipped — invalid product title")
                continue

            price_text = safe_get(By.CLASS_NAME, "a-price-whole")
            price = clean_price(price_text)

            rating_text = safe_get(By.CLASS_NAME, "a-icon-alt")
            try:
                rating = float(rating_text.split()[0]) if rating_text else None
            except Exception:
                rating = None

            reviews_text = safe_get(By.ID, "acrCustomerReviewText")
            try:
                reviews = int(re.sub(r"[^\d]", "", reviews_text)) if reviews_text else None
            except Exception:
                reviews = None

            # Main image
            main_image_url = (
                safe_get(By.CSS_SELECTOR, "img#landingImage", attr="src")
                or safe_get(By.CSS_SELECTOR, "img[data-old-hires]", attr="src")
                or safe_get(By.CSS_SELECTOR, "img[src*='images']", attr="src")
            )

            if not main_image_url:
                print("❌ Skipped — no main image")
                continue

            description = safe_get(By.ID, "feature-bullets")
            availability = safe_get(By.ID, "availability")

            # Gallery
            gallery_urls = []
            try:
                for t in driver.find_elements(By.CSS_SELECTOR, "#altImages img"):
                    src = t.get_attribute("src")
                    if src:
                        gallery_urls.append(src.replace(".SS40", ""))
            except:
                pass

            # ---------------------------------------------------
            # Item Code
            # ---------------------------------------------------
            if asin:
                item_code = clean_item_code(asin)
            else:
                code_hash = hashlib.md5(url.encode()).hexdigest()[:8]
                item_code = clean_item_code(f"SKU-{idx}-{code_hash}")

            # ---------------------------------------------------
            # Download Images
            # ---------------------------------------------------
            main_local = download_image_retry(main_image_url, "amazon", item_code)
            gallery_local = []

            for g in gallery_urls:
                img = download_image_retry(g, "amazon", item_code)
                if img:
                    gallery_local.append(img)

            # ---------------------------------------------------
            # SAVE TO DB  (FIXED amazon_url)
            # ---------------------------------------------------
            defaults = dict(
                name=title,
                price=price,
                default_price=price,
                image=main_local,
                gallery=gallery_local,
                short_description=(description or "")[:255],
                description=description,

                # ✅ save the product URL (not image URL)
                amazon_url=url,

                other_information=(
                    f"Availability: {availability or 'N/A'} | "
                    f"Rating: {rating or '-'} | "
                    f"Reviews: {reviews or 0}"
                ),
            )

            try:
                close_old_connections()
                Item.objects.create(**defaults)
                # Sync sequence occasionally
                if idx % 100 == 0:
                    sync_postgres_sequence()
                print("✅ Saved:", title)
            except Exception as e:
                print("❌ DB Save failed:", e)
                try:
                    close_old_connections()
                    Item.objects.create(**defaults)
                    print("✅ Saved after retry:", title)
                except Exception as e2:
                    print("❌ Final DB Save failed — skipping:", e2)

        driver.quit()
        print("🎉 Scraping Complete!")
















# from django.core.management.base import BaseCommand
# from django.db import connection
# from scrapper.models import Item
# import pandas as pd
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from webdriver_manager.chrome import ChromeDriverManager
# import time, re, hashlib, os, json
# from scrapper.management.commands.common_image_utils import download_image
# from django.db.models import TextField
# import urllib.parse


# # ---------------------------------------------------
# # CLEAN AMAZON URL → Always DP Link
# # ---------------------------------------------------
# def clean_amazon_url(url):
#     """Convert messy Amazon URLs into clean https://www.amazon.in/dp/ASIN"""
#     if not url or not isinstance(url, str):
#         return url

#     # 1) unwrap redirect URLs
#     if "sspa/click" in url or "spc/click" in url:
#         try:
#             parsed = urllib.parse.urlparse(url)
#             qs = urllib.parse.parse_qs(parsed.query)
#             if "url" in qs:
#                 url = qs["url"][0]
#         except:
#             pass

#     # 2) extract ASIN
#     m = re.search(r"/dp/([A-Z0-9]{10})", url)
#     if m:
#         asin = m.group(1)
#         return f"https://www.amazon.in/dp/{asin}"

#     m = re.search(r"/gp/product/([A-Z0-9]{10})", url)
#     if m:
#         asin = m.group(1)
#         return f"https://www.amazon.in/dp/{asin}"

#     # 3) strip params
#     try:
#         url = url.split("?")[0].split("#")[0]
#     except:
#         pass

#     return url


# # ---------------------------------------------------
# # HELPERS
# # ---------------------------------------------------
# def clean_price(price_text):
#     if not price_text:
#         return None
#     try:
#         clean = re.sub(r"[^\d.]", "", price_text)
#         return float(clean) if clean else None
#     except:
#         return None


# def clean_item_code(raw_code):
#     if not raw_code:
#         return "UNKNOWN"
#     return re.sub(r'[^A-Za-z0-9_-]', '', raw_code)


# def sync_postgres_sequence(table_name="item", pk_field="id"):
#     with connection.cursor() as cursor:
#         cursor.execute(f"""
#             SELECT setval(
#                 pg_get_serial_sequence('{table_name}', '{pk_field}'),
#                 COALESCE((SELECT MAX({pk_field}) FROM {table_name}), 1)
#             );
#         """)


# # ---------------------------------------------------
# # MAIN SCRAPER COMMAND
# # ---------------------------------------------------
# class Command(BaseCommand):
#     help = "Scrape Amazon product pages and store into Item model with local images"

#     def add_arguments(self, parser):
#         parser.add_argument("--file", type=str, required=True, help="Excel file with URLs")
#         parser.add_argument("--headless", action="store_true", default=False)

#     def handle(self, *args, **kwargs):
#         file_path = kwargs["file"]
#         headless = kwargs["headless"]

#         # ---------------------------------------------------
#         # LOAD EXCEL + detect correct column
#         # ---------------------------------------------------
#         df = pd.read_excel(file_path)

#         if "amazon_url" in df.columns:
#             url_col = "amazon_url"
#         elif "Unnamed: 13" in df.columns:
#             url_col = "Unnamed: 13"
#         else:
#             raise ValueError(
#                 f"No valid URL column found. Excel columns: {list(df.columns)}"
#             )

#         urls = df[url_col].dropna().astype(str).tolist()

#         # Clean + filter Amazon URLs
#         urls = [
#             clean_amazon_url(u)
#             for u in urls
#             if "amazon" in u.lower()
#         ]

#         self.stdout.write(self.style.SUCCESS(f"✅ Loaded {len(urls)} Amazon URLs."))

#         # ---------------------------------------------------
#         # CHROME OPTIONS
#         # ---------------------------------------------------
#         options = webdriver.ChromeOptions()
#         if headless:
#             options.add_argument("--headless=new")

#         options.add_argument("--disable-gpu")
#         options.add_argument("--disable-dev-shm-usage")
#         options.add_argument("--no-sandbox")
#         options.add_argument("--disable-software-rasterizer")
#         options.add_argument("--window-size=1400,1000")

#         driver = webdriver.Chrome(
#             service=Service(ChromeDriverManager().install()),
#             options=options
#         )

#         sync_postgres_sequence()

#         # ---------------------------------------------------
#         # SCRAPE EACH PRODUCT
#         # ---------------------------------------------------
#         for idx, url in enumerate(urls, start=1):

#             print(f"\n[{idx}/{len(urls)}] Scraping: {url}")

#             # Load URL
#             try:
#                 driver.get(url)
#             except Exception as e:
#                 print("❌ Could not load URL:", e)
#                 continue

#             time.sleep(1.3)

#             # ---------------------------------------------------
#             # CHECK DUPLICATE (FIXED)
#             # ---------------------------------------------------
#             if Item.objects.filter(amazon_url=url).exists():
#                 print("⏩ Skipped — already exists:", url)
#                 continue

#             # ---------------------------------------------------
#             # Handle Search Result Page
#             # ---------------------------------------------------
#             if "amazon.in/s?k=" in url:
#                 try:
#                     print("🟡 Search page detected → Opening first product...")
#                     first = driver.find_element(
#                         By.CSS_SELECTOR,
#                         "div.s-main-slot div[data-component-type='s-search-result'] h2 a"
#                     )
#                     product_url = clean_amazon_url(first.get_attribute("href"))
#                     print("🔗 Product:", product_url)
#                     driver.get(product_url)
#                     time.sleep(1.2)
#                     url = product_url  # update cleaned product url
#                 except:
#                     print("⚠ No product found — skipping")
#                     continue

#             # Safe getter
#             def safe_get(by, value, attr="text"):
#                 try:
#                     elem = driver.find_element(by, value)
#                     return elem.get_attribute(attr).strip() if attr != "text" else elem.text.strip()
#                 except:
#                     return None

#             # ---------------------------------------------------
#             # Extract ASIN
#             # ---------------------------------------------------
#             asin_match = re.search(r"/dp/([A-Z0-9]{10})", driver.current_url)
#             asin = asin_match.group(1) if asin_match else None

#             # ---------------------------------------------------
#             # Extract Core Product Data
#             # ---------------------------------------------------
#             title = safe_get(By.ID, "productTitle")
#             if not title or len(title.strip()) < 3:
#                 print("❌ Skipped — invalid product title")
#                 continue

#             price_text = safe_get(By.CLASS_NAME, "a-price-whole")
#             price = clean_price(price_text)

#             rating_text = safe_get(By.CLASS_NAME, "a-icon-alt")
#             rating = float(rating_text.split()[0]) if rating_text else None

#             reviews_text = safe_get(By.ID, "acrCustomerReviewText")
#             reviews = int(re.sub(r"[^\d]", "", reviews_text)) if reviews_text else None

#             # Main image
#             main_image_url = (
#                 safe_get(By.CSS_SELECTOR, "img#landingImage", attr="src")
#                 or safe_get(By.CSS_SELECTOR, "img[data-old-hires]", attr="src")
#                 or safe_get(By.CSS_SELECTOR, "img[src*='images']", attr="src")
#             )

#             if not main_image_url:
#                 print("❌ Skipped — no main image")
#                 continue

#             description = safe_get(By.ID, "feature-bullets")
#             availability = safe_get(By.ID, "availability")

#             # Gallery
#             gallery_urls = []
#             try:
#                 for t in driver.find_elements(By.CSS_SELECTOR, "#altImages img"):
#                     src = t.get_attribute("src")
#                     if src:
#                         gallery_urls.append(src.replace(".SS40", ""))
#             except:
#                 pass

#             # ---------------------------------------------------
#             # Item Code
#             # ---------------------------------------------------
#             if asin:
#                 item_code = clean_item_code(asin)
#             else:
#                 code_hash = hashlib.md5(url.encode()).hexdigest()[:8]
#                 item_code = clean_item_code(f"SKU-{idx}-{code_hash}")

#             # ---------------------------------------------------
#             # Download Images
#             # ---------------------------------------------------
#             main_local = download_image(main_image_url, "amazon", item_code)
#             gallery_local = []

#             for g in gallery_urls:
#                 img = download_image(g, "amazon", item_code)
#                 if img:
#                     gallery_local.append(img)

#             # ---------------------------------------------------
#             # SAVE TO DB  (FIXED amazon_url)
#             # ---------------------------------------------------
#             defaults = dict(
#                 name=title,
#                 price=price,
#                 default_price=price,
#                 image=main_local,
#                 gallery=gallery_local,
#                 short_description=(description or "")[:255],
#                 description=description,

#                 # ✅ FIXED HERE — save the product URL (not image URL)
#                 amazon_url=url,

#                 other_information=(
#                     f"Availability: {availability or 'N/A'} | "
#                     f"Rating: {rating or '-'} | "
#                     f"Reviews: {reviews or 0}"
#                 ),
#             )

#             # Create item
#             Item.objects.create(**defaults)

#             print("✅ Saved:", title)

#         driver.quit()
#         print("🎉 Scraping Complete!")















# from django.core.management.base import BaseCommand
# from django.db import connection
# from scrapper.models import Item
# import pandas as pd
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from webdriver_manager.chrome import ChromeDriverManager
# import time, re, hashlib, os, json
# from scrapper.management.commands.common_image_utils import download_image
# from django.db.models import TextField
# import urllib.parse


# # ---------------------------------------------------
# # CLEAN AMAZON URL
# # ---------------------------------------------------
# def clean_amazon_url(url):
#     """Sanitize URL → https://www.amazon.in/dp/ASIN"""
#     if not url or not isinstance(url, str):
#         return url

#     # 1. unwrap redirect URLs
#     if "sspa/click" in url or "spc/click" in url:
#         try:
#             parsed = urllib.parse.urlparse(url)
#             qs = urllib.parse.parse_qs(parsed.query)
#             if "url" in qs:
#                 url = qs["url"][0]
#         except:
#             pass

#     # 2. extract ASIN
#     m = re.search(r"/dp/([A-Z0-9]{10})", url)
#     if m:
#         asin = m.group(1)
#         return f"https://www.amazon.in/dp/{asin}"

#     m2 = re.search(r"/gp/product/([A-Z0-9]{10})", url)
#     if m2:
#         asin = m2.group(1)
#         return f"https://www.amazon.in/dp/{asin}"

#     # 3 remove params
#     try:
#         url = url.split("?")[0].split("#")[0]
#     except:
#         pass

#     return url


# # ---------------------------------------------------
# # HELPERS
# # ---------------------------------------------------
# def clean_price(price_text):
#     if not price_text:
#         return None
#     try:
#         clean = re.sub(r"[^\d.]", "", price_text)
#         return float(clean) if clean else None
#     except:
#         return None


# def clean_item_code(raw_code):
#     if not raw_code:
#         return "UNKNOWN"
#     return re.sub(r'[^A-Za-z0-9_-]', '', raw_code)


# def sync_postgres_sequence(table_name="item", pk_field="id"):
#     with connection.cursor() as cursor:
#         cursor.execute(f"""
#             SELECT setval(
#                 pg_get_serial_sequence('{table_name}', '{pk_field}'),
#                 COALESCE((SELECT MAX({pk_field}) FROM {table_name}), 1)
#             );
#         """)


# # ---------------------------------------------------
# # MAIN SCRAPER COMMAND
# # ---------------------------------------------------
# class Command(BaseCommand):
#     help = "Scrape Amazon product pages and store into Item model with local images"

#     def add_arguments(self, parser):
#         parser.add_argument("--file", type=str, required=True, help="Excel file with URLs")
#         parser.add_argument("--headless", action="store_true", default=False)

#     def handle(self, *args, **kwargs):
#         file_path = kwargs["file"]
#         headless = kwargs["headless"]

#         df = pd.read_excel(file_path)
#         urls = df.iloc[:, 13].dropna().astype(str).tolist()

#         # Only Amazon URLs & Clean them
#         urls = [
#             clean_amazon_url(u)
#             for u in urls
#             if isinstance(u, str) and "amazon" in u.lower()
#         ]

#         self.stdout.write(self.style.SUCCESS(f"✅ Found {len(urls)} Amazon URLs."))

#         # ------------------------------
#         # Chrome Options (stable)
#         # ------------------------------
#         options = webdriver.ChromeOptions()
#         if headless:
#             options.add_argument("--headless=new")

#         options.add_argument("--disable-gpu")
#         options.add_argument("--disable-dev-shm-usage")
#         options.add_argument("--no-sandbox")
#         options.add_argument("--disable-software-rasterizer")
#         options.add_argument("--window-size=1400,1000")

#         driver = webdriver.Chrome(
#             service=Service(ChromeDriverManager().install()),
#             options=options
#         )

#         sync_postgres_sequence()

#         # ------------------------------
#         # SCRAPE EACH PRODUCT
#         # ------------------------------
#         for idx, url in enumerate(urls, start=1):

#             print(f"\n[{idx}/{len(urls)}] Scraping: {url}")

#             try:
#                 driver.get(url)
#             except Exception as e:
#                 print("❌ Could not load URL:", e)
#                 continue

#             time.sleep(1.5)

#             # If search page → open first product
#             if "amazon.in/s?k=" in url:
#                 try:
#                     print("🟡 Search page detected → opening first product...")
#                     first = driver.find_element(
#                         By.CSS_SELECTOR,
#                         "div.s-main-slot div[data-component-type='s-search-result'] h2 a"
#                     )
#                     product_link = clean_amazon_url(first.get_attribute("href"))
#                     print("🔗 Product:", product_link)
#                     driver.get(product_link)
#                     time.sleep(1.5)
#                 except:
#                     print("⚠️ Could not extract product — skipping")
#                     continue

#             # Safe getter
#             def safe_get(by, value, attr="text"):
#                 try:
#                     elem = driver.find_element(by, value)
#                     return elem.get_attribute(attr).strip() if attr != "text" else elem.text.strip()
#                 except:
#                     return None

#             # Extract ASIN
#             asin_match = re.search(r"/dp/([A-Z0-9]{10})", driver.current_url)
#             asin = asin_match.group(1) if asin_match else None

#             title = safe_get(By.ID, "productTitle")

#             # Skip if no title / invalid
#             if not title or len(title.strip()) < 3:
#                 print("❌ Skipped — No valid title")
#                 continue

#             price_text = safe_get(By.CLASS_NAME, "a-price-whole")
#             price = clean_price(price_text)

#             rating_text = safe_get(By.CLASS_NAME, "a-icon-alt")
#             rating = float(rating_text.split()[0]) if rating_text else None

#             reviews_text = safe_get(By.ID, "acrCustomerReviewText")
#             reviews = int(re.sub(r"[^\d]", "", reviews_text)) if reviews_text else None

#             # Main image
#             main_image_url = (
#                 safe_get(By.CSS_SELECTOR, "img#landingImage", attr="src")
#                 or safe_get(By.CSS_SELECTOR, "img[data-old-hires]", attr="src")
#                 or safe_get(By.CSS_SELECTOR, "img[src*='images']", attr="src")
#             )

#             if not main_image_url:
#                 print("❌ Skipped — no main image")
#                 continue

#             description = safe_get(By.ID, "feature-bullets")
#             availability = safe_get(By.ID, "availability")

#             # Gallery
#             gallery_urls = []
#             try:
#                 thumbs = driver.find_elements(By.CSS_SELECTOR, "#altImages img")
#                 for t in thumbs:
#                     src = t.get_attribute("src")
#                     if src:
#                         gallery_urls.append(src.replace("._SS40_", ""))
#             except:
#                 pass

#             # Item code
#             if asin:
#                 item_code = clean_item_code(asin)
#             else:
#                 # fallback: generate stable SKU
#                 code_hash = hashlib.md5(url.encode()).hexdigest()[:8]
#                 item_code = clean_item_code(f"SKU-{idx}-{code_hash}")

#             # Download images
#             main_local = download_image(main_image_url, "amazon", item_code)
#             gallery_local = []
#             for g in gallery_urls:
#                 img = download_image(g, "amazon", item_code)
#                 if img:
#                     gallery_local.append(img)

#             # Save
#             defaults = dict(
#                 name=title,
#                 price=price,
#                 default_price=price,
#                 image=main_local,
#                 gallery=gallery_local,
#                 short_description=(description or "")[:255],
#                 description=description,
#                 other_information=f"Availability: {availability or 'N/A'} | Rating: {rating or '-'} | Reviews: {reviews or 0}",
#             )

#             # If model uses TextField, JSON serialize
#             image_field = Item._meta.get_field("image")
#             gallery_field = Item._meta.get_field("gallery")

#             if isinstance(image_field, TextField):
#                 defaults["image"] = json.dumps(main_local) if main_local else None

#             if isinstance(gallery_field, TextField):
#                 defaults["gallery"] = json.dumps(gallery_local) if gallery_local else "[]"

#             try:
#                 item, created = Item.objects.update_or_create(
#                     item_code=item_code, defaults=defaults
#                 )
#                 status = "🆕 Created" if created else "♻️ Updated"
#                 print(f"{status} → {item.name} | ₹{item.price or 'N/A'}")

#             except Exception as e:
#                 print(f"❌ DB Save Failed ({item_code}):", e)

#         driver.quit()
#         self.stdout.write(self.style.SUCCESS("🎉 Amazon scraping completed successfully."))




















# from django.core.management.base import BaseCommand
# from django.db import connection
# from scrapper.models import Item
# import pandas as pd
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from webdriver_manager.chrome import ChromeDriverManager
# import time, re, hashlib, os, json
# from scrapper.management.commands.common_image_utils import download_image
# from django.db.models import TextField


# # -----------------------
# # Helpers
# # -----------------------
# def clean_price(price_text):
#     """Clean numeric price string into float."""
#     if not price_text:
#         return None
#     try:
#         clean = re.sub(r"[^\d.]", "", price_text)
#         return float(clean) if clean else None
#     except:
#         return None


# def clean_item_code(raw_code):
#     """Sanitize item_code to satisfy DB regex constraint (letters, numbers, underscore, hyphen)."""
#     if not raw_code:
#         return "UNKNOWN"
#     return re.sub(r'[^A-Za-z0-9_-]', '', raw_code)


# def sync_postgres_sequence(table_name="item", pk_field="id"):
#     """Ensure Postgres sequence matches MAX(id)."""
#     with connection.cursor() as cursor:
#         cursor.execute(f"""
#             SELECT setval(
#                 pg_get_serial_sequence('{table_name}', '{pk_field}'),
#                 COALESCE((SELECT MAX({pk_field}) FROM {table_name}), 1)
#             );
#         """)


# # -----------------------
# # Main Command
# # -----------------------
# class Command(BaseCommand):
#     help = "Scrape Amazon product pages and store into Item model with local images"

#     def add_arguments(self, parser):
#         parser.add_argument("--file", type=str, required=True, help="Excel file with URLs")
#         parser.add_argument("--headless", action="store_true", default=False)

#     def handle(self, *args, **kwargs):
#         file_path = kwargs["file"]
#         headless = kwargs["headless"]

#         # Load Excel file
#         df = pd.read_excel(file_path)
#         urls = df.iloc[:, 13].dropna().tolist()
#         urls = [u for u in urls if isinstance(u, str) and "amazon" in u.lower()]
#         self.stdout.write(self.style.SUCCESS(f"✅ Found {len(urls)} Amazon URLs."))

#         # Setup Chrome options
#         options = webdriver.ChromeOptions()
#         if headless:
#             options.add_argument("--headless=new")
#         options.add_argument("--no-sandbox")
#         options.add_argument("--disable-gpu")

#         driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

#         # Sync ID sequence before inserts
#         sync_postgres_sequence()

#         for idx, url in enumerate(urls, start=1):
#             print(f"\n[{idx}/{len(urls)}] Scraping: {url}")
#             driver.get(url)
#             time.sleep(2)

#             # 🧠 Detect and handle search result pages
#             if "amazon.in/s?k=" in url:
#                 try:
#                     print("🟡 Detected search results page — opening first product...")
#                     first_result = driver.find_element(
#                         By.CSS_SELECTOR, "div.s-main-slot div[data-component-type='s-search-result'] h2 a"
#                     )
#                     product_link = first_result.get_attribute("href")
#                     print(f"🔗 Found product link: {product_link}")
#                     driver.get(product_link)
#                     time.sleep(3)
#                 except Exception as e:
#                     print(f"⚠️ Could not open product detail: {e}")
#                     continue

#             def safe_get(by, value, attr="text"):
#                 """Safely extract text or attribute from element."""
#                 try:
#                     elem = driver.find_element(by, value)
#                     return elem.get_attribute(attr).strip() if attr != "text" else elem.text.strip()
#                 except:
#                     return None

#             # ---- Extract Data ----
#             try:
#                 asin = url.split("/dp/")[1].split("/")[0]
#             except Exception:
#                 asin = None

#             title = safe_get(By.ID, "productTitle")
#             price_text = safe_get(By.CLASS_NAME, "a-price-whole")
#             price = clean_price(price_text)
#             rating_text = safe_get(By.CLASS_NAME, "a-icon-alt")
#             rating = float(rating_text.split()[0]) if rating_text else None
#             reviews_text = safe_get(By.ID, "acrCustomerReviewText")
#             reviews = int(re.sub(r"[^\d]", "", reviews_text)) if reviews_text else None

#             # 🧩 Robust image detection
#             main_image_url = safe_get(By.CSS_SELECTOR, "img#landingImage", attr="src")
#             if not main_image_url:
#                 main_image_url = safe_get(By.CSS_SELECTOR, "img[data-old-hires]", attr="src")
#             if not main_image_url:
#                 main_image_url = safe_get(By.CSS_SELECTOR, "img[src*='images']", attr="src")

#             availability = safe_get(By.ID, "availability")
#             description = safe_get(By.ID, "feature-bullets")

#             # ---- Gallery Images ----
#             gallery_urls = []
#             try:
#                 thumbs = driver.find_elements(By.CSS_SELECTOR, "#altImages img")
#                 for t in thumbs:
#                     src = t.get_attribute("src")
#                     if src:
#                         gallery_urls.append(src.replace("._SS40_", ""))
#             except:
#                 pass

#             # ---- Generate item_code ----
#             if asin:
#                 item_code = clean_item_code(asin)
#             else:
#                 code_hash = hashlib.md5(url.encode()).hexdigest()[:8]
#                 item_code = clean_item_code(f"SKU-{idx}-{code_hash}")

#             print(f"🧩 Item code: {item_code}")
#             print(f"🧾 Title: {title or 'N/A'}")
#             print(f"💰 Price: {price or 'N/A'}")
#             print(f"🖼️ Main image URL: {main_image_url or 'N/A'}")

#             # ---- Download Images ----
#             main_local = download_image(main_image_url, "amazon", item_code)
          
#             gallery_local = []
#             for g in gallery_urls:
#                 img_data = download_image(g, "amazon", item_code)
#                 if img_data:
#                     gallery_local.append(img_data)

#             # ---- Build Defaults ----
#             defaults = dict(
#                 name=title or f"Unnamed Product {idx}",
#                 price=price,
#                 default_price=price,
#                 image=main_local,
#                 gallery=gallery_local,
#                 short_description=(description or "")[:255],
#                 description=description,
#                 other_information=f"Availability: {availability or 'N/A'} | Rating: {rating or '-'} | Reviews: {reviews or 0}",
#             )

#             # Clean up invalid keys
#             invalid_keys = {"brand", "url", "source"}
#             defaults = {k: v for k, v in defaults.items() if k not in invalid_keys}

#             # ✅ Match Django Admin field type (TextField or JSON)
#             image_field = Item._meta.get_field("image")
#             gallery_field = Item._meta.get_field("gallery")

#             if isinstance(image_field, TextField):
#                 defaults["image"] = json.dumps(main_local) if main_local else None
#             else:
#                 defaults["image"] = main_local

#             if isinstance(gallery_field, TextField):
#                 defaults["gallery"] = json.dumps(gallery_local) if gallery_local else "[]"
#             else:
#                 defaults["gallery"] = gallery_local

#             # ---- Save to DB ----
#             try:
#                 item, created = Item.objects.update_or_create(item_code=item_code, defaults=defaults)
#                 msg_status = "🆕 Created" if created else "♻️ Updated"
#                 self.stdout.write(self.style.SUCCESS(f"{msg_status} {item.name} | ₹{item.price or 'N/A'}"))
#             except Exception as e:
#                 print(f"❌ Failed to save item {item_code}: {e}")

#         driver.quit()
#         self.stdout.write(self.style.SUCCESS("🎉 Amazon scraping completed successfully."))
































