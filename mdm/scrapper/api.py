from rest_framework import serializers, viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image_url"]


class ProductSerializer(serializers.ModelSerializer):
    gallery = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "asin", "title", "price", "price_text",
            "rating", "reviews", "url", "image", "availability",
            "brand", "category", "description", "source",
            "scraped_at", "gallery"
        ]


class StandardPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = "page_size"
    max_page_size = 200


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by("-scraped_at")
    serializer_class = ProductSerializer
    pagination_class = StandardPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "asin", "brand", "category"]
    ordering_fields = ["scraped_at", "price", "rating"]
