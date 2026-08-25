from rest_framework import serializers
from .models import Distillery, Bottle

class DistillerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Distillery
        fields = '__all__'

class BottleSerializer(serializers.ModelSerializer):
    # I added this so the JSON payload includes the actual name of the distillery, 
    # not just its database ID number.
    distillery_name = serializers.ReadOnlyField(source='distillery.name')

    class Meta:
        model = Bottle
        fields = ['id', 'name', 'abv', 'description', 'distillery', 'distillery_name']
        