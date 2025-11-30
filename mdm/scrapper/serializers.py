from rest_framework import serializers
import json
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = "__all__"

    def get_image(self, obj):
        """
        Return direct image URL (compatible with FastAPI + frontend)
        """
        try:
            if not obj.image:
                return None
            data = json.loads(obj.image) if isinstance(obj.image, str) else obj.image
            return data.get("url") if isinstance(data, dict) else None
        except Exception:
            return None

    def get_gallery(self, obj):
        """
        Return clean list of image URLs
        """
        try:
            if not obj.gallery:
                return []
            data = json.loads(obj.gallery) if isinstance(obj.gallery, str) else obj.gallery
            if isinstance(data, list):
                return [g.get("url") for g in data if isinstance(g, dict) and "url" in g]
            return []
        except Exception:
            return []


