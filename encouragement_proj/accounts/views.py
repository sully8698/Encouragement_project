from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status


# Create your views here.

class GetUserView(RetrieveAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = SignupSerializer

    def get(self, request, *args, **kwargs):
        try:
            instance = self.request.user.customer
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
            return Response({"message": "User removed successfully"}, status=status.HTTP_200_OK)
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

    def put(self, request, *args, **kwargs): # works but requires all keys in request header
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, context={'request': request})
        
        if serializer.is_valid():
                updated_instance = serializer.save()
                return Response({"message": f'User: {updated_instance.username} updated successfully'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
            
    
    def patch(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True, context={'request': request})

            if serializer.is_valid():
                updated_instance = serializer.save()
                return Response({"message": f'User: {updated_instance.username} updated successfully'}, status=status.HTTP_200_OK)
            
            return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)