from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView, Response
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from rest_framework import status


# Create your views here.

class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            customer = serializer.save()  # Save the customer
            return Response({"message": "User created successfully", "user": customer.username.username}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
