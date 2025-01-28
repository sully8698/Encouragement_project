from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
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

class UpdateUserView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SignupSerializer

    def get_object(self):
        return self.request.user.customer

    def perform_update(self, serializer):
        instance = serializer.save()
        return instance

    def put(self, request, *args, **kwargs): # works but requires username and password in request header
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, context={'request': request})
        
        if serializer.is_valid():
                self.perform_update(serializer)
                return Response(serializer.data)

        return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
            
    
    def patch(self, request, *args, **kwargs): # Patch request seems to work fine
        return self.partial_update(request, *args, **kwargs)