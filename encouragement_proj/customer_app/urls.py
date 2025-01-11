from django.urls import path, register_converter
from .views import AllCustomers, SelectCustomer
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', AllCustomers.as_view(), name='all_customers'),
    path('<int_or_str:id>/', SelectCustomer.as_view(), name='select_customer')
]