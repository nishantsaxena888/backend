import json
from django.http import JsonResponse
from .models import Item


def clean_media_value(value):
    """Convert stored image/gallery JSON or strings to clean URLs or list of URLs."""
    if not value:
        return None

    # Convert JSON string to Python object
    try:
        parsed = json.loads(value) if isinstance(value, str) else value
    except json.JSONDecodeError:
        parsed = value

    # Case 1: single dict with "url"
    if isinstance(parsed, dict) and "url" in parsed:
        return parsed["url"]

    # Case 2: list of dicts
    if isinstance(parsed, list):
        urls = []
        for item in parsed:
            if isinstance(item, dict) and "url" in item:
                urls.append(item["url"])
        return urls

    # Case 3: plain string URL
    if isinstance(parsed, str) and parsed.startswith("http"):
        return parsed

    return None


def item_list(request):
    """Return all items with properly formatted URLs."""
    items = Item.objects.all()
    data = []

    for item in items:
        image = clean_media_value(item.image)
        gallery = clean_media_value(item.gallery)

        if isinstance(gallery, str):
            gallery = [gallery]
        elif not gallery:
            gallery = []

        data.append({
            "id": item.id,
            "title": item.name or "",
            "newPrice": item.price or item.default_price or 0,
            "category": "General",
            "image": image,           # ✅ Clean single URL
            "gallery": gallery,       # ✅ List of URLs
            "short_description": item.short_description or item.description or "",
        })

    return JsonResponse(data, safe=False)


def item_detail(request, pk):
    """Return one item by ID, with clean image/gallery URLs."""
    from .models import Item

    try:
        item = Item.objects.get(pk=pk)

        image = clean_media_value(item.image)
        gallery = clean_media_value(item.gallery)

        if isinstance(gallery, str):
            gallery = [gallery]
        elif not gallery:
            gallery = []

        data = {
            "id": item.id,
            "title": item.name or "",
            "newPrice": item.price or item.default_price or 0,
            "category": "General",
            "image": image,
            "gallery": gallery,
            "short_description": item.short_description or item.description or "",
        }
        return JsonResponse(data)
    except Item.DoesNotExist:
        return JsonResponse({"error": "Item not found"}, status=404)











# # scrapper/views.py
# from django.http import JsonResponse
# from .models import Item


# def item_list(request):
#     """Return all items as JSON."""
#     items = list(Item.objects.values("id", "item_code", "name", "price", "brand", "source", "url"))
#     return JsonResponse(items, safe=False)


# def item_detail(request, pk):
#     """Return a single item by ID."""
#     try:
#         item = Item.objects.get(pk=pk)
#         data = {
#             "id": item.id,
#             "item_code": item.item_code,
#             "name": item.name,
#             "price": item.price,
#             "default_price": item.default_price,
#             "brand": item.brand,
#             "source": item.source,
#             "image": item.image,
#             "gallery": item.gallery,
#             "description": item.description,
#             "url": item.url,
#             "scraped_at": item.scraped_at,
#         }
#         return JsonResponse(data)
#     except Item.DoesNotExist:
#         return JsonResponse({"error": "Item not found"}, status=404)






