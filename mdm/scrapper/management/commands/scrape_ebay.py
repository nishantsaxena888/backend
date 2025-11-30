# # D:\project\nishify\mdm\scrapper\management\commands\scrape_ebay.py
# from django.core.management.base import BaseCommand
# from django.db import connection
# from scrapper.models import Item

# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager

# from scrapper.management.commands.common_image_utils import download_image

# import time
# import re
# import json


# # ===============================
# # Helpers
# # ===============================
# def clean_item_code(raw_code):
#     """Clean eBay item_code to satisfy DB regex constraint."""
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


# # ===============================
# # Core Scraper Logic
# # ===============================
# def scrape_ebay_item(url, stdout=None, headless=True):
#     """Scrape a single eBay product page and save to Item model"""

#     chrome_options = Options()
#     if headless:
#         chrome_options.add_argument("--headless=new")
#     chrome_options.add_argument("--disable-gpu")
#     chrome_options.add_argument("--no-sandbox")
#     chrome_options.add_argument("--window-size=1920,1080")

#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
#     driver.get(url)
#     time.sleep(2)

#     # --- Helper to safely extract text/attr ---
#     def safe_find(selector, attr=None):
#         try:
#             el = driver.find_element(By.CSS_SELECTOR, selector)
#             return el.get_attribute(attr).strip() if attr else el.text.strip()
#         except:
#             return None

#     # --- Scrape product data ---
#     title = safe_find("h1.x-item-title__mainTitle") or safe_find("h1") or None
#     price_text = safe_find("div.x-price-primary") or safe_find("#prcIsum") or None
#     condition = safe_find("div.d-item-condition span")
#     seller = safe_find("div.x-sellercard-atf__info__about-seller a") or safe_find(".mbg-nw")
#     availability = safe_find("span.d-quantity__availability")

#     # Parse numeric price
#     try:
#         clean_price = re.sub(r"[^\d.]", "", price_text or "")
#         price = float(clean_price) if clean_price else None
#     except:
#         price = None

#     # --- Extract item code from URL or fallback timestamp ---
#     try:
#         match = re.search(r"/itm/(\d+)", url)
#         item_code = match.group(1) if match else f"EBAY-{int(time.time())}"
#     except:
#         item_code = f"EBAY-{int(time.time())}"
#     item_code = clean_item_code(item_code)

#     # --- Main image ---
#     main_img_url = safe_find("div.ux-image-carousel-item.active img", attr="src") or \
#                    safe_find("#icImg", attr="src") or \
#                    safe_find(".product-image img", attr="src")
#     main_img = download_image(main_img_url, "ebay", item_code)  # returns JSON dict or None

#     # --- Gallery images ---
#     gallery_images = []
#     try:
#         img_elements = driver.find_elements(By.CSS_SELECTOR, "div.ux-image-carousel-item img")
#         for img in img_elements:
#             src = img.get_attribute("src")
#             if src:
#                 if "s-l64" in src:
#                     src = src.replace("s-l64", "s-l1600")
#                 if src not in gallery_images:
#                     gallery_images.append(src)
#     except:
#         pass

#     # Download all gallery images
#     gallery_local = []
#     for g in gallery_images:
#         img_data = download_image(g, "ebay", item_code)
#         if img_data:
#             gallery_local.append(img_data)

#     driver.quit()

#     # --- Build defaults ---
#     defaults = dict(
#         name=title or "No Title",
#         price=price,
#         default_price=price,
#         image=main_img,        # JSON dict or None
#         gallery=gallery_local, # list of JSON dicts
#         short_description=condition or "",
#         description=availability or "",
#         other_information=f"Condition: {condition or 'N/A'} | Seller: {seller or 'Unknown'}",
#     )

#     # Remove invalid fields not present in shared item table
#     invalid_keys = {"brand", "url", "source"}
#     defaults = {k: v for k, v in defaults.items() if k not in invalid_keys}

#     # --- Sync sequence before insert ---
#     sync_postgres_sequence()

#     # --- Save or update ---
#     try:
#         item, created = Item.objects.update_or_create(item_code=item_code, defaults=defaults)
#         msg = f"{'🆕 Created' if created else '♻️ Updated'} item [{item_code}] – {title or 'No Title'} | Price: {price}"
#         saved_images = len(gallery_local) + (1 if main_img else 0)
#         if stdout:
#             # stdout might be a management stdout (has style) or a plain TextIO.
#             try:
#                 # if style exists (when this is command.self.stdout)
#                 style = getattr(stdout, "style", None)
#                 if style:
#                     stdout.write(style.SUCCESS(msg))
#                     stdout.write(f"🖼️ Saved {saved_images} images locally.")
#                 else:
#                     stdout.write(msg + "\n")
#                     stdout.write(f"🖼️ Saved {saved_images} images locally.\n")
#             except Exception:
#                 # fallback to plain write
#                 try:
#                     stdout.write(msg + "\n")
#                     stdout.write(f"🖼️ Saved {saved_images} images locally.\n")
#                 except Exception:
#                     print(msg)
#                     print(f"🖼️ Saved {saved_images} images locally.")
#         else:
#             print(msg)
#             print(f"🖼️ Saved {saved_images} images locally.")
#     except Exception as e:
#         err = f"❌ Failed to save item {item_code}: {e}"
#         if stdout:
#             try:
#                 style = getattr(stdout, "style", None)
#                 if style:
#                     stdout.write(style.ERROR(err))
#                 else:
#                     stdout.write(err + "\n")
#             except Exception:
#                 print(err)
#         else:
#             print(err)

#     return item if 'item' in locals() else None


# # ===============================
# # Django Command Wrapper
# # ===============================
# class Command(BaseCommand):
#     help = "Scrape a single eBay product and save as Item"

#     def add_arguments(self, parser):
#         parser.add_argument("url", type=str, help="eBay product URL")
#         parser.add_argument("--headless", action="store_true", default=True)

#     def handle(self, *args, **kwargs):
#         url = kwargs["url"]
#         headless = kwargs["headless"]
#         self.stdout.write(f"🔍 Scraping {url} ...")
#         item = scrape_ebay_item(url, stdout=self.stdout, headless=headless)
#         if item:
#             try:
#                 self.stdout.write(self.style.SUCCESS(f"🎉 Successfully saved: {item.name}"))
#             except Exception:
#                 self.stdout.write(f"🎉 Successfully saved: {item.name}")
#         else:
#             try:
#                 self.stdout.write(self.style.ERROR("❌ Failed to scrape item"))
#             except Exception:
#                 self.stdout.write("❌ Failed to scrape item")













# from django.core.management.base import BaseCommand
# from django.db import connection
# from scrapper.models import Item

# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager
# from scrapper.management.commands.common_image_utils import download_image

# import os
# import time
# import re
# import requests
# from urllib.parse import urlparse


# # ===============================
# # Common Config for Image Saving
# # ===============================
# BASE_IMAGE_PATH = r"D:\project\nishify\uploads\pioneer_fresh"


# def download_image(image_url: str, source: str, item_code: str) -> str | None:
#     """Download image to BASE_IMAGE_PATH/source/item_code/filename."""
#     if not image_url:
#         return None
#     try:
#         folder = os.path.join(BASE_IMAGE_PATH, source, item_code)
#         os.makedirs(folder, exist_ok=True)
#         filename = os.path.basename(urlparse(image_url).path)
#         if not filename or "." not in filename:
#             filename = f"{int(time.time())}.jpg"
#         local_path = os.path.join(folder, filename)
#         response = requests.get(image_url, stream=True, timeout=15)
#         if response.status_code == 200:
#             with open(local_path, "wb") as f:
#                 for chunk in response.iter_content(1024):
#                     f.write(chunk)
#             return local_path
#         else:
#             print(f"⚠️ Failed ({response.status_code}): {image_url}")
#             return None
#     except Exception as e:
#         print(f"❌ Error saving {image_url}: {e}")
#         return None


# # ===============================
# # Scraper Logic
# # ===============================

# def clean_item_code(raw_code):
#     """Clean eBay item_code to satisfy DB regex constraint."""
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


# def scrape_ebay_item(url, stdout=None):
#     """Scrape a single eBay product page and save to Item model"""

#     # --- Setup Chrome driver ---
#     chrome_options = Options()
#     chrome_options.add_argument("--headless=new")
#     chrome_options.add_argument("--disable-gpu")
#     chrome_options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
#     driver.get(url)
#     time.sleep(3)

#     # --- Helpers ---
#     def safe_find(selector, attr=None):
#         try:
#             el = driver.find_element(By.CSS_SELECTOR, selector)
#             return el.get_attribute(attr).strip() if attr else el.text.strip()
#         except:
#             return None

#     # --- Scrape data ---
#     title = safe_find("h1.x-item-title__mainTitle")
#     price_text = safe_find("div.x-price-primary")
#     condition = safe_find("div.d-item-condition span")
#     seller = safe_find("div.x-sellercard-atf__info__about-seller a")
#     availability = safe_find("span.d-quantity__availability")

#     # Parse numeric price
#     try:
#         clean_price = re.sub(r"[^\d.]", "", price_text or "")
#         price = float(clean_price) if clean_price else None
#     except:
#         price = None

#     # --- Extract item code ---
#     try:
#         match = re.search(r"/itm/(\d+)", url)
#         item_code = match.group(1) if match else f"EBAY-{int(time.time())}"
#     except:
#         item_code = f"EBAY-{int(time.time())}"
#     item_code = clean_item_code(item_code)

#     # --- Main image ---
#     main_img_url = safe_find("div.ux-image-carousel-item.active img", attr="src")
#     main_img = download_image(main_img_url, "ebay", item_code)

#     # --- Gallery images ---
#     gallery_images = []
#     try:
#         img_elements = driver.find_elements(By.CSS_SELECTOR, "div.ux-image-carousel-item img")
#         for img in img_elements:
#             src = img.get_attribute("src")
#             if src and src not in gallery_images:
#                 if "s-l64" in src:
#                     src = src.replace("s-l64", "s-l1600")
#                 gallery_images.append(src)
#     except:
#         pass

#     gallery_images = [
#         download_image(g, "ebay", item_code) for g in gallery_images if g
#     ]
#     gallery_images = [g for g in gallery_images if g]

#     driver.quit()

#     # --- Build defaults ---
#     defaults = dict(
#         name=title or "No Title",
#         price=price,
#         default_price=price,
#         image=main_img,
#         gallery=gallery_images,
#         short_description=condition or "",
#         description=availability or "",
#         other_information=f"Condition: {condition or 'N/A'} | Seller: {seller or 'Unknown'}",
#     )

#     # Remove invalid fields not present in shared item table
#     invalid_keys = {"brand", "url", "source"}
#     defaults = {k: v for k, v in defaults.items() if k not in invalid_keys}

#     # --- Sync sequence before insert ---
#     sync_postgres_sequence()

#     # --- Save or update ---
#     try:
#         item, created = Item.objects.update_or_create(
#             item_code=item_code,
#             defaults=defaults
#         )
#         if stdout:
#             stdout.write(
#                 f"{'🆕 Created' if created else '♻️ Updated'} item [{item_code}] – {title or 'No Title'} | Price: {price}"
#             )
#             stdout.write(f"🖼️ Saved {len(gallery_images) + (1 if main_img else 0)} images locally.")
#     except Exception as e:
#         if stdout:
#             stdout.write(f"❌ Failed to save item: {e}")
#         return None

#     return item


# class Command(BaseCommand):
#     help = "Scrape a single eBay product and save as Item"

#     def add_arguments(self, parser):
#         parser.add_argument("url", type=str, help="eBay product URL")

#     def handle(self, *args, **kwargs):
#         url = kwargs["url"]
#         self.stdout.write(f"🔍 Scraping {url} ...")

#         item = scrape_ebay_item(url, stdout=self.stdout)

#         if item:
#             self.stdout.write(self.style.SUCCESS(f"🎉 Successfully saved: {item.name}"))
#         else:
#             self.stdout.write(self.style.ERROR("❌ Failed to scrape item"))
