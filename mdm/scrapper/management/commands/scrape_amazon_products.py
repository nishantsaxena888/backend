from django.core.management.base import BaseCommand
from django.db import connection
from scrapper.models import Item
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time, re, hashlib, json, urllib.parse
from scrapper.management.commands.common_image_utils import download_image


# ---------------------------------------------------
# CLEAN AMAZON URL → Always DP Link
# ---------------------------------------------------
def clean_amazon_url(url):
    if not url or not isinstance(url, str):
        return url

    # unwrap redirect URLs
    if "sspa/click" in url or "spc/click" in url:
        try:
            parsed = urllib.parse.urlparse(url)
            qs = urllib.parse.parse_qs(parsed.query)
            if "url" in qs:
                url = qs["url"][0]
        except:
            pass

    # extract ASIN
    m = re.search(r"/dp/([A-Z0-9]{10})", url)
    if m:
        return f"https://www.amazon.in/dp/{m.group(1)}"

    m = re.search(r"/gp/product/([A-Z0-9]{10})", url)
    if m:
        return f"https://www.amazon.in/dp/{m.group(1)}"

    # strip extra params
    try:
        return url.split("?")[0].split("#")[0]
    except:
        return url


# ---------------------------------------------------
# HELPERS
# ---------------------------------------------------
def clean_price(price_text):
    if not price_text:
        return None
    clean = re.sub(r"[^\d.]", "", price_text)
    return float(clean) if clean else None


def clean_item_code(raw_code):
    if not raw_code:
        return ""
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
# MAIN SCRAPER COMMAND
# ---------------------------------------------------
class Command(BaseCommand):
    help = "Scrape Amazon product pages and store into Item model"

    def add_arguments(self, parser):
        parser.add_argument("--file", type=str, required=True, help="Excel with URLs")
        parser.add_argument("--headless", action="store_true", default=False)

    def handle(self, *args, **kwargs):
        file_path = kwargs["file"]
        headless = kwargs["headless"]

        df = pd.read_excel(file_path)

        if "amazon_url" in df.columns:
            url_col = "amazon_url"
        elif "Unnamed: 13" in df.columns:
            url_col = "Unnamed: 13"
        else:
            raise ValueError("No valid Amazon URL column found in Excel")

        urls = df[url_col].dropna().astype(str).tolist()
        urls = [clean_amazon_url(u) for u in urls if "amazon" in u.lower()]

        self.stdout.write(self.style.SUCCESS(f"✅ Loaded {len(urls)} URLs."))

        # Chrome Options
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument("--headless=new")

        options.add_argument("--disable-gpu")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--no-sandbox")
        options.add_argument("--window-size=1300,1000")
        options.add_argument("--disable-software-rasterizer")

        driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=options
        )

        sync_postgres_sequence()

        # ---------------------------------------------------
        # SCRAPE LOOP
        # ---------------------------------------------------
        for idx, url in enumerate(urls, start=1):

            print(f"\n[{idx}/{len(urls)}] Scraping: {url}")

            # Skip duplicates
            if Item.objects.filter(amazon_url=url).exists():
                print("⏩ Already in DB, skipping.")
                continue

            try:
                driver.get(url)
            except:
                print("❌ Failed to load URL")
                continue

            time.sleep(1.2)

            # Scraping functions
            def safe_get(by, value, attr="text"):
                try:
                    elem = driver.find_element(by, value)
                    return elem.get_attribute(attr) if attr != "text" else elem.text.strip()
                except:
                    return None

            # Extract ASIN
            asin = None
            m = re.search(r"/dp/([A-Z0-9]{10})", driver.current_url)
            if m:
                asin = m.group(1)

            # Extract Data
            title = safe_get(By.ID, "productTitle")
            if not title:
                print("❌ No product title — skipping")
                continue

            price = clean_price(safe_get(By.CLASS_NAME, "a-price-whole"))
            rating_text = safe_get(By.CLASS_NAME, "a-icon-alt")
            rating = float(rating_text.split()[0]) if rating_text else None
            reviews_text = safe_get(By.ID, "acrCustomerReviewText")
            reviews = int(re.sub(r"[^\d]", "", reviews_text)) if reviews_text else None

            # Main Image
            main_image_url = (
                safe_get(By.CSS_SELECTOR, "img#landingImage", "src")
                or safe_get(By.CSS_SELECTOR, "img[data-old-hires]", "src")
                or safe_get(By.CSS_SELECTOR, "img[src*='images']", "src")
            )
            if not main_image_url:
                print("❌ No main image — skipping")
                continue

            description = safe_get(By.ID, "feature-bullets")
            availability = safe_get(By.ID, "availability")

            # Gallery images
            gallery_urls = []
            try:
                for t in driver.find_elements(By.CSS_SELECTOR, "#altImages img"):
                    src = t.get_attribute("src")
                    if src:
                        gallery_urls.append(src.replace("._SS40_", ""))
            except:
                pass

            # ---------------------------------------------------
            # SAFE ITEM CODE GENERATION
            # ---------------------------------------------------
            if asin:
                item_code = clean_item_code(asin)
            else:
                hashed = hashlib.md5(url.encode()).hexdigest()[:10]
                item_code = clean_item_code(f"SKU_{hashed}")

            # FINAL SAFETY (never empty)
            if not item_code or not re.match(r'^[A-Za-z0-9_-]+$', item_code):
                fallback = hashlib.md5(url.encode()).hexdigest()[:12]
                item_code = f"SKU_{fallback}"

            # ---------------------------------------------------
            # DOWNLOAD IMAGES
            # ---------------------------------------------------
            main_local = download_image(main_image_url, "amazon", item_code)
            gallery_local = []

            for g in gallery_urls:
                img = download_image(g, "amazon", item_code)
                if img:
                    gallery_local.append(img)

            # ---------------------------------------------------
            # SAVE ITEM
            # ---------------------------------------------------
            defaults = dict(
                name=title,
                price=price,
                default_price=price,
                image=json.dumps(main_local),
                gallery=json.dumps(gallery_local),
                short_description=(description or "")[:255],
                description=description,
                amazon_url=url,
                other_information=(
                    f"Availability: {availability or 'N/A'} | "
                    f"Rating: {rating or '-'} | "
                    f"Reviews: {reviews or 0}"
                ),
                item_code=item_code,
            )

            try:
                Item.objects.create(**defaults)
                print("✅ Saved:", item_code, "|", title)
            except Exception as e:
                print("❌ DB Error:", e)

        driver.quit()
        print("🎉 Scraping Complete!")
