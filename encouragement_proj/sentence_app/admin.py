from django.contrib import admin
from customer_app.models import Customer
from sentence_app.models import Sentence

# Register your models here.
admin.site.register([Customer, Sentence])