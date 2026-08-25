from django.db import models

class Distillery(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Bottle(models.Model):
    distillery = models.ForeignKey(Distillery, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    abv = models.DecimalField(max_digits=5, decimal_places=2, help_text="Alcohol By Volume")
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.distillery.name} {self.name}"