from django.urls import path
from scrapper import views

urlpatterns = [
    path("item/", views.item_list, name="item_list"),
    path("item/<int:pk>/", views.item_detail, name="item_detail"),
]





# # scrapper/urls.py
# from django.urls import path
# from scrapper import views

# urlpatterns = [
#     path("items/", views.item_list, name="item_list"),
#     path("items/<int:pk>/", views.item_detail, name="item_detail"),
# ]







