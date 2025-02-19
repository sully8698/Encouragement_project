from django.shortcuts import render
from rest_framework.views import APIView, Response
from django.core.serializers import serialize
import json
import os
 

# Create your views here.

class Service(APIView):

    def post(self,request):
        pass