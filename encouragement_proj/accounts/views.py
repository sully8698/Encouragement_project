from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.views import APIView, Response
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
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


class DeleteUserView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user # sets the current authenticated user

    def perform_destroy(self, instance):
        instance.delete()

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object() # get the specific logged in user
            self.perform_destroy(instance)  # Call delete logic
            return Response({"message": "User removed successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)