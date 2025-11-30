from django.contrib import admin
from .models import Item


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for shared 'item' table.
    Django connects to existing FastAPI table (db_table='item', managed=False)
    """

    list_display = (
        "id",
        "item_code",
        "name",
        "brand_id",
        "price",
        "default_price",
        "active",
    )

    list_filter = ("active",)
    search_fields = ("item_code", "name")
    ordering = ("item_code",)  # ✅ changed from '-scraped_at' to something valid
    readonly_fields = ()       # ✅ no scraped_at anymore

    fieldsets = (
        (
            "Basic Info",
            {
                "fields": (
                    "item_code",
                    "name",
                    "brand_id",
                    "manufacturer_item_no",
                    "price",
                    "default_price",
                    "active",
                )
            },
        ),
        (
            "Descriptions",
            {"fields": ("short_description", "description", "other_information")},
        ),
        (
            "Images",
            {"fields": ("image", "gallery")},
        ),
        (
            "Inventory / Meta",
            {
                "fields": (
                    "size",
                    "unit",
                    "qtyss",
                    "locations",
                    "promotion_indicator",
                )
            },
        ),
    )


















# from django.contrib import admin
# from django.utils.html import format_html, format_html_join
# from .models import Product, ProductImage


# class ProductImageInline(admin.TabularInline):
#     model = ProductImage
#     extra = 3
#     readonly_fields = ["image_preview"]

#     def image_preview(self, obj):
#         if obj.image_url:
#             return format_html('<img src="{}" width="80" />', obj.image_url)
#         return "No Image"


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("asin", "title", "price", "rating", "reviews", "source", "scraped_at", "main_image", "gallery_preview")
#     search_fields = ("title", "asin", "url", "source")
#     list_filter = ("source", "scraped_at")
#     inlines = [ProductImageInline]

#     def main_image(self, obj):
#         if obj.image:
#             return format_html('<img src="{}" width="80" />', obj.image)
#         return "No Image"

#     def gallery_preview(self, obj):
#         images = obj.gallery.all()[:3]  # show only first 3 images
#         if images:
#             return format_html_join(
#                 "", '<img src="{}" width="60" style="margin:2px;" />',
#                 ((img.image_url,) for img in images)
#             )
#         return "No Gallery"









