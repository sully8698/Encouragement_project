from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from .validators import validate_name
import pytz

# Create your models here.
class Customer(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer")
    first_name = models.CharField(max_length=100, validators=[validate_name])
    last_name = models.CharField(max_length=100, validators=[validate_name])
    email = models.CharField(max_length=200, unique=True, default=None, validators=[EmailValidator()])

    # phone number will need custom validator per whatever messaging api format requirements needed 
    phone_number = models.CharField(max_length=30)
    message_hour = models.IntegerField(default=9, blank=True, validators=[MaxValueValidator(24), MinValueValidator(0)])
    timezone = models.CharField(max_length=63, blank=True, null=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Name: {self.first_name} {self.last_name}, Email: {self.email}, Phone#: {self.phone_number}, Date created: {self.date_created}'
    
    def change_email(self, new_email):
        try:
            EmailValidator(new_email)
        except ValidationError as e:
            return e 
        
        else:
            self.email = new_email
            self.save()
    
    def change_phone_number(self, new_number):
        self.phone_number = new_number
        self.save()
    
    def change_message_hour(self, new_hour):
        self.message_hour = new_hour
        self.save()
    
    def change_timezone(self, new_timezone):
        try:
            pytz.timezone(new_timezone)  # Validates timezone using pytz
        except pytz.UnknownTimeZoneError:
            raise ValidationError(f"Invalid timezone: {new_timezone}")
        self.timezone = new_timezone
        self.save()

    
    
    
