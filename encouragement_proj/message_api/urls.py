from django.urls import path
from .views import Service

urlpatterns = [
    path('service/', Service.as_view(), name='service')
]