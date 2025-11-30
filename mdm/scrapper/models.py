from django.db import models
from django.conf import settings
import json



class Item(models.Model):
    id = models.AutoField(primary_key=True)
    item_code = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    manufacturer_item_no = models.CharField(max_length=128, null=True, blank=True)

    upc_code = models.CharField(max_length=14, null=True, blank=True)
    box_upc = models.CharField(max_length=14, null=True, blank=True)
    inner_pack_upc = models.CharField(max_length=14, null=True, blank=True)
    alternative_upc_1 = models.CharField(max_length=14, null=True, blank=True)
    alternative_upc_2 = models.CharField(max_length=14, null=True, blank=True)
    alternative_upc_3 = models.CharField(max_length=14, null=True, blank=True)

    size = models.CharField(max_length=64, null=True, blank=True)
    unit = models.CharField(max_length=32, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    qtyss = models.FloatField(null=True, blank=True)
    expire_date = models.DateField(null=True, blank=True)

    locations = models.CharField(
        max_length=16,
        choices=[("outside", "Outside"), ("inside", "Inside")],
        default="outside",
    )

    brand_id = models.IntegerField(null=True, blank=True)
    tax_group_id = models.IntegerField(null=True, blank=True)
    price_group_id = models.IntegerField(null=True, blank=True)
    cash_discount_group_id = models.IntegerField(null=True, blank=True)
    vendor_id = models.IntegerField(null=True, blank=True)

    items_to_be_sold_by_units = models.BooleanField(default=True)
    include_in_msa = models.BooleanField(default=True)
    identification_symbol = models.CharField(max_length=64, null=True, blank=True)
    distribution_sku = models.CharField(max_length=64, null=True, blank=True)
    item_per_selling_unit = models.CharField(max_length=64, null=True, blank=True)

    promotion_indicator = models.CharField(
        max_length=3, choices=[("yes", "Yes"), ("no", "No")], default="no"
    )

    product_unit_size_description = models.TextField(null=True, blank=True)
    msa_category_code = models.CharField(max_length=64, null=True, blank=True)
    distributor_product_unit_size = models.CharField(max_length=64, null=True, blank=True)

    is_cash_and_carry = models.BooleanField(default=True)
    cash_and_carry_item_code = models.CharField(max_length=64, null=True, blank=True)

    active = models.BooleanField(default=True)
    image = models.TextField(null=True, blank=True)
    gallery = models.TextField(null=True, blank=True)
    short_description = models.TextField(null=True, blank=True)
    default_price = models.FloatField(null=True, blank=True)
    other_information = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    amazon_url = models.CharField(max_length=1024, null=True, blank=True)

    class Meta:
        db_table = "item"
        managed = True
        verbose_name = "Item"
        verbose_name_plural = "Items"

    def __str__(self):
        return f"{self.name or self.item_code}"

    # ✅ Add this method to fix URLs automatically
    def save(self, *args, **kwargs):
        base_url = getattr(settings, "SITE_BASE_URL", "http://localhost:8000")
        media_prefix = getattr(settings, "MEDIA_URL", "/doc/pioneer_fresh/")
        full_prefix = f"{base_url.rstrip('/')}{media_prefix}"

        def fix_url(entry):
            """Ensure URLs are full, not relative"""
            if isinstance(entry, dict) and "url" in entry:
                if not entry["url"].startswith("http"):
                    entry["url"] = f"{full_prefix}{entry['url'].lstrip('/')}"
            return entry

        # Fix image
        if self.image:
            try:
                img_data = json.loads(self.image)
                img_data = fix_url(img_data)
                self.image = json.dumps(img_data)
            except Exception:
                pass

        # Fix gallery
        if self.gallery:
            try:
                gal_data = json.loads(self.gallery)
                if isinstance(gal_data, list):
                    gal_data = [fix_url(x) for x in gal_data]
                    self.gallery = json.dumps(gal_data)
            except Exception:
                pass

        super().save(*args, **kwargs)


# class Item(models.Model):
#     id = models.AutoField(primary_key=True)
#     item_code = models.CharField(max_length=30, unique=True)
#     name = models.CharField(max_length=255, null=True, blank=True)
#     manufacturer_item_no = models.CharField(max_length=128, null=True, blank=True)

#     upc_code = models.CharField(max_length=14, null=True, blank=True)
#     box_upc = models.CharField(max_length=14, null=True, blank=True)
#     inner_pack_upc = models.CharField(max_length=14, null=True, blank=True)
#     alternative_upc_1 = models.CharField(max_length=14, null=True, blank=True)
#     alternative_upc_2 = models.CharField(max_length=14, null=True, blank=True)
#     alternative_upc_3 = models.CharField(max_length=14, null=True, blank=True)

#     size = models.CharField(max_length=64, null=True, blank=True)
#     unit = models.CharField(max_length=32, null=True, blank=True)
#     price = models.FloatField(null=True, blank=True)
#     qtyss = models.FloatField(null=True, blank=True)
#     expire_date = models.DateField(null=True, blank=True)

#     locations = models.CharField(
#         max_length=16,
#         choices=[("outside", "Outside"), ("inside", "Inside")],
#         default="outside",
#     )

#     brand_id = models.IntegerField(null=True, blank=True)
#     tax_group_id = models.IntegerField(null=True, blank=True)
#     price_group_id = models.IntegerField(null=True, blank=True)
#     cash_discount_group_id = models.IntegerField(null=True, blank=True)
#     vendor_id = models.IntegerField(null=True, blank=True)

#     items_to_be_sold_by_units = models.BooleanField(default=True)
#     include_in_msa = models.BooleanField(default=True)
#     identification_symbol = models.CharField(max_length=64, null=True, blank=True)
#     distribution_sku = models.CharField(max_length=64, null=True, blank=True)
#     item_per_selling_unit = models.CharField(max_length=64, null=True, blank=True)

#     promotion_indicator = models.CharField(
#         max_length=3, choices=[("yes", "Yes"), ("no", "No")], default="no"
#     )

#     product_unit_size_description = models.TextField(null=True, blank=True)
#     msa_category_code = models.CharField(max_length=64, null=True, blank=True)
#     distributor_product_unit_size = models.CharField(max_length=64, null=True, blank=True)

#     is_cash_and_carry = models.BooleanField(default=True)
#     cash_and_carry_item_code = models.CharField(max_length=64, null=True, blank=True)

#     active = models.BooleanField(default=True)
#     image = models.TextField(null=True, blank=True)
#     gallery = models.TextField(null=True, blank=True)
#     short_description = models.TextField(null=True, blank=True)
#     default_price = models.FloatField(null=True, blank=True)
#     other_information = models.TextField(null=True, blank=True)
#     description = models.TextField(null=True, blank=True)

#     class Meta:
#         db_table = "item"      # ✅ Shared table
#         managed = True        # ✅ Don’t let Django create/alter
#         verbose_name = "Item"
#         verbose_name_plural = "Items"

#     def __str__(self):
#         return f"{self.name or self.item_code}"
