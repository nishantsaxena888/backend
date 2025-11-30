from django.core.management.base import BaseCommand
from scrapper.models import Item
import json

class Command(BaseCommand):
    help = "Clean old /doc/pioneer_fresh/ URLs but skip Cloudinary URLs"

    def add_arguments(self, parser):
        parser.add_argument("--commit", action="store_true", help="Save changes")

    def handle(self, *args, **options):
        commit = options["commit"]
        updated = 0

        for item in Item.objects.all():

            changed = False

            # IMAGE
            new_image = self.clean_image(item.image)
            if new_image != item.image:
                item.image = new_image
                changed = True

            # GALLERY
            new_gallery = self.clean_gallery(item.gallery)
            if new_gallery != item.gallery:
                item.gallery = new_gallery
                changed = True

            if changed and commit:
                item.save()
                updated += 1

        self.stdout.write(f"✔ Done. Updated {updated} items.")

    # ------------------------------
    def clean_image(self, value):
        if not value:
            return None

        try:
            parsed = json.loads(value) if isinstance(value, str) else value
        except:
            return value

        if isinstance(parsed, dict):
            url = parsed.get("url")

            # Skip new MDM Cloudinary URL
            if url and ("cloudinary.com" in url or url.startswith("http")):
                return value

            # Remove OLD /doc/pioneer_fresh/
            if url and "/doc/" in url:
                cleaned = url.split("/doc/")[-1]
                return json.dumps({"url": cleaned})

        return value

    # ------------------------------
    def clean_gallery(self, value):
        if not value:
            return None

        try:
            parsed = json.loads(value) if isinstance(value, str) else value
        except:
            return value

        if isinstance(parsed, list):
            cleaned_list = []

            for img in parsed:
                if not isinstance(img, dict):
                    continue

                url = img.get("url")

                if url and ("cloudinary.com" in url or url.startswith("http")):
                    cleaned_list.append(img)
                elif url and "/doc/" in url:
                    cleaned = url.split("/doc/")[-1]
                    cleaned_list.append({"url": cleaned})
                else:
                    cleaned_list.append(img)

            return json.dumps(cleaned_list)

        return value










# from django.core.management.base import BaseCommand
# from scrapper.models import Item
# import json
# from urllib.parse import urlparse
# import os

# # -----------------------------------------------------------
# # SITE BASE URL (Heroku + Local)
# # -----------------------------------------------------------
# SITE_BASE_URL = os.environ.get(
#     "SITE_BASE_URL",
#     "https://nishify-mdm-backend-0fef467ee9f0.herokuapp.com"
# )


# class Command(BaseCommand):
#     help = "Normalize image and gallery fields by removing duplicate hosts"

#     def add_arguments(self, parser):
#         parser.add_argument("--commit", action="store_true", help="Save changes")

#     def handle(self, *args, **options):
#         commit = options["commit"]
#         updated = 0
#         total = Item.objects.count()

#         for item in Item.objects.all():
#             changed = False

#             # IMAGE
#             new_image = self.normalize_field(item.image)
#             if new_image != item.image:
#                 item.image = new_image
#                 changed = True

#             # GALLERY
#             new_gallery = self.normalize_field(item.gallery, list_ok=True)
#             if new_gallery != item.gallery:
#                 item.gallery = new_gallery
#                 changed = True

#             if changed and commit:
#                 item.save()
#                 updated += 1

#         self.stdout.write(f"✔ Done. total={total} updated={updated}")

#     # -----------------------------------------------------------
#     def normalize_field(self, value, list_ok=False):
#         if not value:
#             return None

#         try:
#             parsed = json.loads(value) if isinstance(value, str) else value
#         except:
#             parsed = value

#         # dict
#         if isinstance(parsed, dict) and "url" in parsed:
#             return self.clean_url(parsed["url"])

#         # list of dicts
#         if isinstance(parsed, list):
#             cleaned = [self.clean_url(x["url"]) for x in parsed if isinstance(x, dict)]
#             return cleaned if list_ok else (cleaned[0] if cleaned else None)

#         # string
#         if isinstance(parsed, str):
#             return self.clean_url(parsed)

#         return None

#     # -----------------------------------------------------------
#     def clean_url(self, url):
#         if not url:
#             return None

#         p = urlparse(url)

#         # if already absolute → strip domain, keep path only
#         if p.netloc:
#             clean = p.path
#         else:
#             clean = url

#         if not clean.startswith("/"):
#             clean = "/" + clean

#         return SITE_BASE_URL.rstrip("/") + clean






