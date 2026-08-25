from rest_framework import viewsets
from .models import Distillery, Bottle
from .serializers import DistillerySerializer, BottleSerializer

class DistillerycVIewSet(viewsets.ModelViewSet):
    queryset = Distillery.objects.all()
    serializer_class = DistillerySerializer

class BottleViewSet(viewsets.ModelViewSet):
    queryset = Bottle.objects.all()
    serializer_class = BottleSerializer