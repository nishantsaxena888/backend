# # scrape_indiamart.py
# from django.core.management.base import BaseCommand
# from django.db import connection
# from scrapper.models import Item
# from scrapper.management.commands.common_image_utils import download_image

# import re
# import time
# import json
# import hashlib
# from urllib.parse import urljoin, urlparse
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from webdriver_manager.chrome import ChromeDriverManager


# # -------------------------------------------------
# # Helper Utilities
# # -------------------------------------------------
# def clean_item_code(raw_code):
#     """Ensure item_code matches DB regex constraint."""
#     if not raw_code:
#         return "UNKNOWN"
#     return re.sub(r'[^A-Za-z0-9_-]', '', raw_code)


# def sync_postgres_sequence(table_name="item", pk_field="id"):
#     """Align Postgres auto-increment sequence."""
#     with connection.cursor() as cursor:
#         cursor.execute(f"""
#             SELECT setval(
#                 pg_get_serial_sequence('{table_name}', '{pk_field}'),
#                 COALESCE((SELECT MAX({pk_field}) FROM {table_name}), 1)
#             );
#         """)


# def _extract_price_from_text(text):
#     """Extract numeric price (₹ or numeric) as float."""
#     if not text:
#         return None
#     # prefer rupee symbol
#     m = re.search(r'₹\s*[\d,\.]+', text)
#     if not m:
#         m = re.search(r'[\d,]+(?:\.\d+)?', text)
#     if not m:
#         return None
#     num = re.sub(r'[^\d.]', '', m.group())
#     try:
#         return float(num)
#     except Exception:
#         return None


# def safe_write(msg, stdout=None):
#     """Write output safely to either django stdout or plain print."""
#     if stdout and hasattr(stdout, "write"):
#         try:
#             stdout.write(str(msg) + "\n")
#         except Exception:
#             print(msg)
#     else:
#         print(msg)


# def normalize_img_url(src, base_url):
#     """Make image URL absolute and attempt to transform thumb -> large variants."""
#     if not src:
#         return None
#     src = src.strip()
#     # handle lazy attributes like data-srcset / srcset (choose largest)
#     if " " in src and "," in src:  # naive srcset blob
#         try:
#             # pick last candidate (largest)
#             parts = [p.strip() for p in src.split(",")]
#             candidate = parts[-1].split()[0]
#             src = candidate
#         except:
#             src = src.split(",")[0].split()[0]

#     # protocols and relative paths
#     if src.startswith("//"):
#         src = "https:" + src
#     elif src.startswith("/"):
#         parsed = urlparse(base_url)
#         src = f"{parsed.scheme}://{parsed.netloc}{src}"
#     elif not re.match(r'^https?://', src):
#         src = urljoin(base_url, src)

#     # try to convert thumb -> full by removing common thumbnail fragments
#     src = re.sub(r'(_thumb|_tn|-tn|_50x50|_100x100|_150x150|/thumbs/|/thumbnail/)', '', src, flags=re.I)
#     src = re.sub(r'\?.*$', '', src)  # drop query for normalization (still fine)
#     return src


# # -------------------------------------------------
# # Core Scraper Logic
# # -------------------------------------------------
# def scrape_indiamart_item(url, headless=True, stdout=None):
#     """Scrape a single IndiaMART product detail page and return saved Item or None."""
#     # 🚫 Skip invalid / listing URLs (these create "Find related categories" junk)
#     lower = url.lower()
#     if "impcat" in lower or "dir.indiamart.com" in lower or "catalog" in lower:
#         safe_write(f"⏭️ Skipping category/listing page: {url}", stdout)
#         return None

#     chrome_options = Options()
#     if headless:
#         chrome_options.add_argument("--headless=new")
#     chrome_options.add_argument("--disable-gpu")
#     chrome_options.add_argument("--no-sandbox")
#     chrome_options.add_argument("--window-size=1366,1200")
#     chrome_options.add_argument("--disable-dev-shm-usage")

#     driver = webdriver.Chrome(
#         service=Service(ChromeDriverManager().install()),
#         options=chrome_options
#     )

#     try:
#         safe_write(f"🔍 Loading: {url}", stdout)
#         driver.get(url)
#         wait = WebDriverWait(driver, 10)
#         try:
#             # Wait for something that typically exists on product pages
#             wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "h1, .prod-title, .pdp-title, #prodName, title")))
#         except Exception:
#             time.sleep(2)

#         # -------------------------------
#         # Title extraction with fallbacks
#         # -------------------------------
#         title = None
#         title_selectors = (
#             "h1",
#             ".prod-title",
#             ".pdp-title",
#             ".product-title",
#             "#prodName",
#             ".heading",
#             "h1[itemprop='name']",
#             ".product_name",
#         )
#         for sel in title_selectors:
#             try:
#                 el = driver.find_element(By.CSS_SELECTOR, sel)
#                 txt = el.text.strip()
#                 if txt:
#                     title = txt
#                     break
#             except:
#                 pass

#         # fallback to meta title
#         if not title:
#             try:
#                 meta_title = driver.title or driver.find_element(By.TAG_NAME, "title").get_attribute("innerText")
#                 if meta_title:
#                     title = meta_title.split("|")[0].strip()
#             except:
#                 pass

#         # fallback to heuristics on page (avoid "Find related categories" English phrase)
#         if title and "find related category" in title.lower():
#             title = None

#         if not title:
#             try:
#                 # slugify last part of URL
#                 slug = url.split("/")[-1].replace(".html", "")
#                 slug = slug.replace("-", " ").replace("_", " ").strip().title()
#                 title = slug if slug else None
#             except:
#                 title = None

#         if not title:
#             title = "Untitled Product"

#         # -------------------------------
#         # Price extraction
#         # -------------------------------
#         price = None
#         price_selectors = (".price", ".pdp-price", ".product-price", ".amt", ".price-value")
#         for sel in price_selectors:
#             try:
#                 el = driver.find_element(By.CSS_SELECTOR, sel)
#                 ptxt = el.text.strip()
#                 if ptxt:
#                     price = _extract_price_from_text(ptxt)
#                     if price:
#                         break
#             except:
#                 pass

#         if not price:
#             # search page source for rupee amounts
#             price = _extract_price_from_text(driver.page_source)

#         # -------------------------------
#         # Seller extraction
#         # -------------------------------
#         seller = None
#         seller_selectors = (".supplier-name", ".company-name", ".seller-name", ".sellerDetails a", ".company-title")
#         for sel in seller_selectors:
#             try:
#                 el = driver.find_element(By.CSS_SELECTOR, sel)
#                 s = el.text.strip()
#                 if s:
#                     seller = s
#                     break
#             except:
#                 pass

#         # -------------------------------
#         # Description extraction
#         # -------------------------------
#         description = None
#         desc_selectors = ("#description", ".product-description", ".prod-description", ".prod-desc", ".description")
#         for sel in desc_selectors:
#             try:
#                 el = driver.find_element(By.CSS_SELECTOR, sel)
#                 d = el.text.strip()
#                 if d:
#                     description = d
#                     break
#             except:
#                 pass
#         if not description:
#             # last resort: pull visible paragraphs
#             try:
#                 ps = driver.find_elements(By.CSS_SELECTOR, ".product-description p, .prod-desc p")
#                 if ps:
#                     description = "\n".join([p.text.strip() for p in ps if p.text.strip()])
#             except:
#                 pass

#         # -------------------------------
#         # Category / breadcrumb
#         # -------------------------------
#         category = None
#         try:
#             crumbs = driver.find_elements(By.CSS_SELECTOR, "ul.breadcrumb li, .breadcrumbs li")
#             if crumbs:
#                 last = crumbs[-1].text.strip()
#                 if last:
#                     category = last
#         except:
#             pass
#         category = category or "Uncategorized"

#         # -------------------------------
#         # Attributes table extraction
#         # -------------------------------
#         attributes = {}
#         try:
#             rows = driver.find_elements(By.CSS_SELECTOR, "table tr")
#             for r in rows:
#                 try:
#                     tds = r.find_elements(By.TAG_NAME, "td")
#                     if len(tds) >= 2:
#                         k = tds[0].text.strip().rstrip(":")
#                         v = tds[1].text.strip()
#                         if k:
#                             attributes[k] = v
#                 except:
#                     continue
#         except:
#             pass

#         # -------------------------------
#         # Images extraction (robust)
#         # -------------------------------
#         images = []
#         seen = set()
#         # ordered selectors to try (div galleries first, then all imgs)
#         img_selectors = ("div.tn9_card img", "div.tn9_gallery img", ".prod-gallery img", ".product-image img", "img.product-img", "img")

#         for sel in img_selectors:
#             try:
#                 els = driver.find_elements(By.CSS_SELECTOR, sel)
#                 for img in els:
#                     # prefer multiple attributes
#                     for attr in ("src", "data-src", "data-original", "data-lazy-src", "data-srcset", "data-large", "data-zoom-image"):
#                         try:
#                             src = img.get_attribute(attr)
#                             if src:
#                                 break
#                         except:
#                             src = None
#                     if not src:
#                         # try srcset attribute -> take largest
#                         try:
#                             srcset = img.get_attribute("srcset")
#                             if srcset:
#                                 parts = [p.strip() for p in srcset.split(",") if p.strip()]
#                                 if parts:
#                                     src = parts[-1].split()[0]
#                         except:
#                             src = None

#                     src = normalize_img_url(src, url)
#                     if src and src not in seen and len(src) > 8:
#                         seen.add(src)
#                         images.append(src)
#                 if images:
#                     break
#             except Exception:
#                 continue

#         # final fallback: search for any image URLs in page source
#         if not images:
#             try:
#                 matches = re.findall(r'(https?:\/\/[^"\']+\.(?:jpg|jpeg|png|webp))', driver.page_source, flags=re.I)
#                 for m in matches:
#                     nm = normalize_img_url(m, url)
#                     if nm and nm not in seen:
#                         seen.add(nm)
#                         images.append(nm)
#                     if len(images) >= 12:
#                         break
#             except:
#                 pass

#         # -------------------------------
#         # Item code
#         # -------------------------------
#         m = re.search(r'-(\d+)\.html', url)
#         item_code = clean_item_code(m.group(1) if m else f"IM-{int(time.time())}-{hashlib.md5(url.encode()).hexdigest()[:6]}")

#         safe_write(f"🧾 Title: {title}", stdout)
#         safe_write(f"💰 Price: {price or 'N/A'}", stdout)
#         safe_write(f"🖼 Found {len(images)} images", stdout)

#         # -------------------------------
#         # Download images locally
#         # -------------------------------
#         main_local = None
#         gallery_local = []
#         if images:
#             main_local = download_image(images[0], "indiamart", item_code)
#             for g in images[1:]:
#                 img_data = download_image(g, "indiamart", item_code)
#                 if img_data:
#                     gallery_local.append(img_data)

#         # -------------------------------
#         # Build final object and save
#         # -------------------------------
#         defaults = dict(
#             name=title or "Untitled Product",
#             price=price,
#             default_price=price,
#             image=main_local,
#             gallery=gallery_local,
#             short_description=attributes.get("Model") or attributes.get("Type") or "",
#             description=description,
#             other_information=f"Category: {category} | Seller: {seller or 'Unknown'}",
#         )

#         # Remove invalid keys if any
#         invalid_keys = {"brand", "url", "source"}
#         defaults = {k: v for k, v in defaults.items() if k not in invalid_keys}

#         # Match field types (TextField vs JSONField) - keep parity with amazon script
#         try:
#             from django.db.models import TextField
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
#         except Exception:
#             # If any introspection fails, just assign raw
#             defaults["image"] = main_local
#             defaults["gallery"] = gallery_local

#         # Persist (ensure sequence synced)
#         sync_postgres_sequence()
#         item, created = Item.objects.update_or_create(item_code=item_code, defaults=defaults)

#         safe_write(f"{'🆕 Created' if created else '♻️ Updated'} Item [{item_code}] – {title} | ₹{price or 'N/A'}", stdout)
#         safe_write(f"🖼️ Saved {len(gallery_local) + (1 if main_local else 0)} images locally.", stdout)

#         return item

#     except Exception as e:
#         safe_write(f"❌ Error scraping {url}: {e}", stdout)
#         return None

#     finally:
#         try:
#             driver.quit()
#         except:
#             pass


# # -------------------------------------------------
# # Django Management Command Wrapper
# # -------------------------------------------------
# class Command(BaseCommand):
#     help = "Scrape a single IndiaMART product and save to Item model"

#     def add_arguments(self, parser):
#         parser.add_argument("url", type=str, help="IndiaMART product URL")
#         parser.add_argument("--headless", action="store_true", default=False)

#     def handle(self, *args, **kwargs):
#         url = kwargs["url"]
#         headless = kwargs["headless"]

#         # Use style methods here (self.stdout has style)
#         self.stdout.write(self.style.NOTICE(f"🔍 Scraping IndiaMART: {url} (headless={headless})"))
#         item = scrape_indiamart_item(url, headless=headless, stdout=self.stdout)

#         if item:
#             self.stdout.write(self.style.SUCCESS(f"✅ Successfully scraped: {item.name}"))
#         else:
#             self.stdout.write(self.style.WARNING("❌ Failed or skipped this URL."))




















