import requests
import time
from urllib.parse import urlparse
import os

# MDM Upload API
UPLOAD_API = "https://nishify-backend-inventory-f624407669c2.herokuapp.com/api/doc/"


def upload_to_mdm(filename, image_bytes):
    """
    Upload raw image bytes to MDM Upload API.
    Returns Cloudinary / absolute_ui_url.
    """
    try:
        files = {
            "files": (filename, image_bytes, "image/jpeg")
        }

        response = requests.post(UPLOAD_API, files=files, timeout=20)
        data = response.json()
        return data["items"][0]["absolute_ui_url"]
    except Exception as e:
        print("❌ Failed to upload image to MDM:", e)
        return None


def download_image(image_url: str, source: str, item_code: str):
    """
    Downloads image from vendor (Amazon/eBay/IndiaMART)
    → uploads to MDM
    → returns final absolute MDM URL.
    """
    if not image_url:
        return None

    try:
        # Download original image
        response = requests.get(image_url, timeout=15)
        if response.status_code != 200:
            print(f"⚠️ Failed to download: {image_url}")
            return None

        # Filename for MDM upload
        filename = os.path.basename(urlparse(image_url).path)
        if not filename or "." not in filename:
            filename = f"{source}-{item_code}-{int(time.time())}.jpg"

        # Upload to MDM
        absolute_url = upload_to_mdm(filename, response.content)

        return {
            "url": absolute_url,
            "name": filename,
            "size": len(response.content),
        }

    except Exception as e:
        print(f"❌ Error handling image {image_url}: {e}")
        return None











# import os
# import requests
# import time
# from urllib.parse import urlparse
# from django.conf import settings  # ✅ use Django's MEDIA_ROOT and MEDIA_URL
# import json

# # === Use Django media paths ===
# BASE_IMAGE_PATH = getattr(settings, "MEDIA_ROOT", r"D:\project\nishify\uploads\pioneer_fresh")
# MEDIA_URL = getattr(settings, "MEDIA_URL", "/doc/pioneer_fresh/")
# SERVER_BASE_URL = getattr(settings, "SITE_BASE_URL", "http://localhost:8000")


# def download_image(image_url: str, source: str, item_code: str) -> dict | None:
#     """
#     Downloads image into MEDIA_ROOT/source/item_code/filename
#     Returns dict {url, name, size} with proper public URL.
#     """
#     if not image_url:
#         return None

#     try:
#         # Build folder under MEDIA_ROOT (e.g. pioneer_fresh/amazon/SKU123)
#         folder = os.path.join(BASE_IMAGE_PATH, source, item_code)
#         os.makedirs(folder, exist_ok=True)

#         # Derive filename
#         filename = os.path.basename(urlparse(image_url).path)
#         if not filename or "." not in filename:
#             filename = f"{int(time.time())}.jpg"

#         local_path = os.path.join(folder, filename)

#         # Refresh if exists
#         if os.path.exists(local_path):
#             os.remove(local_path)

#         # Download
#         response = requests.get(image_url, stream=True, timeout=15)
#         if response.status_code != 200:
#             print(f"⚠️ Failed to fetch {image_url} ({response.status_code})")
#             return None

#         with open(local_path, "wb") as f:
#             for chunk in response.iter_content(1024):
#                 f.write(chunk)

#         file_size = os.path.getsize(local_path)

#         # Build public URL — exactly like Django admin’s format
#         # MEDIA_URL already contains /doc/pioneer_fresh/
#         rel_path = os.path.relpath(local_path, BASE_IMAGE_PATH).replace("\\", "/")
#         rel_path = rel_path.lstrip("/")

#         # → /doc/pioneer_fresh/<source>/<item_code>/<filename>
#         full_url = f"{SERVER_BASE_URL}{MEDIA_URL}{rel_path}".replace("//doc", "/doc")

#         return {
#             "url": full_url,
#             "name": filename,
#             "size": file_size
#         }

#     except Exception as e:
#         print(f"❌ Error saving image {image_url}: {e}")
#         return None





