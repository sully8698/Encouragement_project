from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from .models import Customer
from django.core.serializers import serialize
import json

# Create your views here.

# get all current customers
class AllCustomers(APIView):
    def get(self, request):
        all_customers = Customer.objects.order_by("last_name")
        all_customers_serialized = serialize("json", all_customers)
        all_customers_json = json.loads(all_customers_serialized)

        return Response(all_customers_json)

# Select a customer by ID or email. Has get and put
class SelectCustomer(APIView):
    def get_customer(self, id):
        if type(id) == int:
            return Customer.objects.get(id = id)
        else:
            return Customer.objects.get(email = id)
    
    def get(self, request, id):
        customer = self.get_customer(id)
        customer_serialized = serialize("json", [customer])
        customer_json = json.loads(customer_serialized)

        return Response(customer_json)

    def put(self, request, id):
        customer = self.get_customer(id)

        if 'email' in request.data:
            customer.change_email(request.data['email'])
        
        if 'phone_number' in request.data:
            customer.change_phone_number(request.data['phone_number'])
        
        if 'message_hour' in request.data:
            customer.change_message_hour(request.data['message_hour'])
        
        customer.full_clean()
        customer.save()
        customer = json.loads(serialize('json', [customer]))
        return Response(customer)
    
    def post(self, request): # needs to be tested still to see if it works
        customer = Customer(request.data)
        customer.full_clean()
        customer.save()
        customer = json.loads(serialize('json', [customer]))
        return Response(customer)
    
    def delete(self, request, id):
        customer = self.get_customer(id)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
