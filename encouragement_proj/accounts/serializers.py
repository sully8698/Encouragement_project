from rest_framework import serializers 
from django.contrib.auth.models import User
from customer_app.models import Customer

# custom serializer due to the onetoone relationship
# between Customer model and django user model
class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    phone_number = serializers.CharField(max_length=30,required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.context.get('request') and self.context['request'].method in ['put', 'patch']:
            for field in self.fields.values():
                field.required = False

    def validate_email(self, value):
        print('running validate_email')
        user = self.context.get('request').user  # Access the current user

        if user.is_authenticated:
            print("User Email: ", user.email)
            print("requested change: ", value)

            # Check if it's an update and if the email is the same as the current user's email
            if user and value != user.email and User.objects.filter(email=value).exists():
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
            'email': validated_data['email'],
            'phone_number': validated_data['phone_number'],
        }
        customer = Customer.objects.create(**customer_data)

        return customer
    
    def delete(self, request, id):
        customer = self.get_customer(id)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        
        new_email = validated_data.get('email', instance.email)
        if new_email != instance.email:  # Only update email if it's changed
            instance.change_email(new_email)
        
        if validated_data.get('password'):
            instance.username.set_password(validated_data['password'])  # Update password properly
        
        instance.save()
        return instance