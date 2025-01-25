from rest_framework import serializers 
from django.contrib.auth.models import User
from customer_app.models import Customer

# custom serializer due to the onetoone relationship
# between Customer model and django user model
class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=False)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=30)

    def validate_email(self, value):
        """Ensure the email is not duplicated"""
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

    def create(self, validated_data):
        # User Object
        user_data = {
            'username': validated_data['username'],
            'password': validated_data['password'],
            'email': validated_data.get('email')
        }
        user = User.objects.create_user(**user_data) # create_user gives proper password hashing

        # Customer Object
        customer_data = {
            'username': user,  # Link the User to the Customer
            'first_name': validated_data['first_name'],
            'last_name': validated_data['last_name'],
            'email': validated_data.get('email'),
            'phone_number': validated_data['phone_number'],
        }
        customer = Customer.objects.create(**customer_data)

        return customer