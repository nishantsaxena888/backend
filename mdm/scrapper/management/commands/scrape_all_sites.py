# scrape_all_sites.py
from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.conf import settings
import pandas as pd
import json
import os


def normalize_media_urls():
    """
    Update image and gallery fields in the 'item' table to include full URLs.
    This ensures FastAPI & frontend get complete absolute paths.
    """
    from scrapper.models import Item

    site_base = settings.SITE_BASE_URL.rstrip("/")
    media_prefix = settings.MEDIA_URL.strip("/")

    items = Item.objects.all()
    updated = 0

    for item in items:
        changed = False

        # --- Handle image ---
        if item.image:
            try:
                img_obj = json.loads(item.image) if isinstance(item.image, str) else item.image
                if isinstance(img_obj, dict) and "url" in img_obj:
                    url = img_obj["url"]
                    if not url.startswith("http"):
                        img_obj["url"] = f"{site_base}/{url.lstrip('/')}"
                        item.image = json.dumps(img_obj)
                        changed = True
            except Exception:
                if isinstance(item.image, str) and not item.image.startswith("http"):
                    full_url = f"{site_base}/{item.image.lstrip('/')}"
                    item.image = json.dumps({"url": full_url})
                    changed = True

        # --- Handle gallery ---
        if item.gallery:
            try:
                gal_list = json.loads(item.gallery) if isinstance(item.gallery, str) else item.gallery
                if isinstance(gal_list, list):
                    new_gallery = []
                    for g in gal_list:
                        if isinstance(g, dict) and "url" in g:
                            url = g["url"]
                            if not url.startswith("http"):
                                g["url"] = f"{site_base}/{url.lstrip('/')}"
                        new_gallery.append(g)
                    item.gallery = json.dumps(new_gallery)
                    changed = True
            except Exception:
                if isinstance(item.gallery, str) and not item.gallery.startswith("http"):
                    full_url = f"{site_base}/{item.gallery.lstrip('/')}"
                    item.gallery = json.dumps([{"url": full_url}])
                    changed = True

        if changed:
            item.save(update_fields=["image", "gallery"])
            updated += 1

    return updated


class Command(BaseCommand):
    help = "Scrape Amazon, eBay, and IndiaMART items from a single Excel file into the Item model"

    def add_arguments(self, parser):
        parser.add_argument(
            "--file",
            type=str,
            required=True,
            help="Path to Excel file containing product URLs (column 14 / 'Unnamed: 13')",
        )
        parser.add_argument(
            "--headless",
            action="store_true",
            default=True,
            help="Run browser in headless mode",
        )

    def handle(self, *args, **options):
        file_path = options["file"]
        headless = options["headless"]

        try:
            df = pd.read_excel(file_path)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Failed to read Excel file: {e}"))
            return

        if "Unnamed: 13" not in df.columns:
            self.stdout.write(
                self.style.ERROR("❌ Expected URLs in column 14 ('Unnamed: 13') but not found.")
            )
            return

        urls = df["Unnamed: 13"].dropna().astype(str).tolist()
        self.stdout.write(self.style.SUCCESS(f"✅ Found {len(urls)} URLs in Excel."))

        # --- Handle Amazon first (bulk scrape) ---
        amazon_urls = [u for u in urls if "amazon" in u.lower()]
        if amazon_urls:
            self.stdout.write(self.style.NOTICE(f"=== Scraping {len(amazon_urls)} Amazon URLs ==="))
            call_command("scrape_amazon_products", file=file_path, headless=headless)

     

        # --- Normalize all media URLs after scraping ---
        updated_count = normalize_media_urls()
        self.stdout.write(
            self.style.SUCCESS(f"🎨 Normalized media URLs for {updated_count} items.")
        )

        self.stdout.write(self.style.SUCCESS("🎉 Scraping finished for all supported sites."))














