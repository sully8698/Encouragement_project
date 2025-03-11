from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from customer_app.models import Customer


# needed imports for user password changing and resets
from django.contrib.auth.forms import PasswordChangeForm, PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes 
from django.core.mail import send_mail, EmailMultiAlternatives
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.conf import settings
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
import logging

import logging # for debugging
logger = logging.getLogger(__name__)
# Create your views here.

class GetUserView(RetrieveAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = SignupSerializer

    def get(self, request, *args, **kwargs):
        try:
            instance = self.request.user.customer
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"error": "User has no customer data."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            customer = serializer.save()  # Save the customer
            
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

    def put(self, request, *args, **kwargs): # works but requires all keys in request header because its a PUT request
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

class PasswordChangeAPI(APIView): 
    def post(self, request, *args, **kwargs):
        form = PasswordChangeForm(user=request.user, data=request.data)
        if form.is_valid():
            form.save()
            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response({"errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        logger.error(f'Incoming request: {request.data}')

        """Handles password reset request by sending an email with a reset link"""
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Email not found."}, status=status.HTTP_400_BAD_REQUEST)

        domain = settings.FRONTEND_URL
        protocol = "https" if request.is_secure() else "http"

        # Generate the uidb64 and token
        uidb64 = urlsafe_base64_encode(force_bytes(str(user.pk)))
        token = default_token_generator.make_token(user)
        
        reset_url = f"{protocol}{domain}/#/reset/{uidb64}/{token}/"
        
        # Debug log
        logger.info(f"Generated Password Reset URL: {reset_url}")

        context = {
        'user': user,
        'reset_url': reset_url,
        'protocol': protocol,
        'domain': domain,
        'uid': uidb64,
        'token': token
    }

        # Email content
        subject = "Password Reset Request"

        html_message = render_to_string("registration/custom_password_reset_email.html", context)
        plain_message = strip_tags(html_message)


        styled_message = EmailMultiAlternatives(
            subject = subject,
            body = plain_message,
            from_email= settings.DEFAULT_FROM_EMAIL,
            to=[email]
        )

        styled_message.attach_alternative(html_message, "text/html")

        logger.info(f"Using FRONTEND_URL: {settings.FRONTEND_URL}")
        logger.info(f"Generated Password Reset URL: {reset_url}")
        logger.info(f"Final email content: {styled_message}")
    
        try:
            styled_message.send()
            return Response({'success': True, 'message': 'Password reset link sent successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}")
            return Response({"error": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetConfirmAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        """Handles password reset confirmation and setting a new password"""
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

            logger.error(f"Incoming request data: {request.data}")

            # Validate new password
            form = SetPasswordForm(user, data=request.data)
            if form.is_valid():
                user = form.save(commit=False)
                user.save()
                return Response({"message": "Password has been successfully reset."}, status=status.HTTP_200_OK)
            logger.error(f"Form errors: {form.errors}")
            return Response({"errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)

        except (TypeError, ValueError, User.DoesNotExist):
            return Response({"error": "Invalid reset link or user not found."}, status=status.HTTP_400_BAD_REQUEST)