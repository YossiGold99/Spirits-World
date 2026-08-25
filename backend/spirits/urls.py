from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DistillerycVIewSet, BottleViewSet

# Initialize the DRF router
touter = DefaultRouter()
touter.register(r'distilleries', DistillerycVIewSet)
touter.register(r'bottles', BottleViewSet)

urlpatterns = [
    path('', include(touter.urls)),
]