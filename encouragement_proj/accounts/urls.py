from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, DeleteUserView, UpdateUserView

urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view(), name='signup'),
    path('delete', DeleteUserView.as_view(), name='delete_user'),
    path('update', UpdateUserView.as_view(), name='update_user')
]