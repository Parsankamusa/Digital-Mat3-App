from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.db import models
from django.utils import timezone

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='profile_photos/', blank=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    
    def __str__(self):
        return self.user.username

class Sacco(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    time_of_operation = models.CharField(null=True, blank=True, max_length=255)
    fare = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now) # New field to store creation time
    route = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True, max_length=255)
    streets = models.CharField(null=True, blank=True, max_length=255)
    # Add other fields as necessary
    def __str__(self):
        return self.name

class Matatu(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE)
    fare = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    time_it_take= models.CharField(null=True, blank=True, max_length=255)
    # route = models.ForeignKey(Route, on_delete=models.CASCADE)
    # Add other fields as necessary

class Route(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    matatu = models.ForeignKey(Matatu, on_delete=models.CASCADE)
    fare = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    # street = models.ForeignKey(Street, on_delete=models.CASCADE)
    # Add other fields as necessary
    def __str__(self):
        return self.name
class Street(models.Model):
    name = models.CharField(null=True, blank=True,max_length=255)
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE)
    matatu = models.ForeignKey(Matatu, null=True, blank=True, on_delete=models.CASCADE)
    # Add other fields as necessary
    def __str__(self):
        return self.name
    
    
class UserProfile(models.Model):
    username = models.CharField(null=True, blank=True, max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(null=True, blank=True, max_length=20)
    
    def __str__(self):
        return self.name
    
    
  
# Create your models here.
class EVChargingLocation(models.Model):
    station_name = models.CharField(max_length=250)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.station_name
