from django.core.management.base import BaseCommand
from scrapper.models import Item
import json
import re


class Command(BaseCommand):
    help = "Fix double-wrapped or invalid URLs in image/gallery fields"

    def handle(self, *args, **options):
        fixed = 0
        total = Item.objects.count()

        for item in Item.objects.all():
            changed = False

            # --- Fix image ---
            new_image = self.clean_url(item.image)
            if new_image != item.image:
                item.image = new_image
                changed = True

            # --- Fix gallery ---
            new_gallery = self.clean_url(item.gallery, list_ok=True)
            if new_gallery != item.gallery:
                item.gallery = new_gallery
                changed = True

            if changed:
                item.save(update_fields=["image", "gallery"])
                fixed += 1

        self.stdout.write(
            self.style.SUCCESS(f"✅ Fixed {fixed} of {total} items.")
        )

    def clean_url(self, value, list_ok=False):
        if not value:
            return None

        # Case 1: URL starts incorrectly like "http://localhost:8000/{'url': 'http://localhost:8000/doc/..."
        if isinstance(value, str) and "doc/pioneer_fresh" in value and "{'url':" in value:
            # Extract the real URL from inside
            match = re.search(r"http://localhost:8000/doc/[^\s'}\"]+", value)
            if match:
                return match.group(0)

        # Case 2: JSON list with nested URLs
        try:
            parsed = json.loads(value) if isinstance(value, str) else value
            if isinstance(parsed, list):
                urls = []
                for p in parsed:
                    if isinstance(p, dict) and "url" in p:
                        urls.append(p["url"])
                    elif isinstance(p, str) and "http" in p:
                        urls.append(p)
                return urls if list_ok else (urls[0] if urls else None)
        except Exception:
            pass

        return value
