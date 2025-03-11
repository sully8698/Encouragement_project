from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, DeleteUserView, UpdateUserView, GetUserView, PasswordChangeAPI, PasswordResetAPI, PasswordResetConfirmAPI
from django.contrib.auth import views as auth_views

import logging

logger = logging.getLogger(__name__)

def test_log_view(request):
    logger.error("🔍 DEBUG: Test view hit!")
    return JsonResponse({"message": "Test log success!"})


urlpatterns = [
    path("test-log/", test_log_view),
    path('get-token', obtain_auth_token), #POST request for token if username and password valid
    path('signup', SignupView.as_view(), name='signup'),
    path('delete', DeleteUserView.as_view(), name='delete_user'),
    path('update', UpdateUserView.as_view(), name='update_user'),
    path('', GetUserView.as_view(), name='get_user'),

    # Password Reset paths
    path('password_change', PasswordChangeAPI.as_view(), name='password_change_api'),
    path('password_reset', PasswordResetAPI.as_view(), name='password_reset_api'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmAPI.as_view(), name='password_reset_confirm'),
]