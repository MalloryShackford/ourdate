from user.models import User
from rest_framework import serializers


from rest_framework import serializers
from .models import User, Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'date_of_birth']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Nest the profile inside the user serializer
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff', 'created_at', 'updated_at', 'profile']
        read_only_field = ['is_active', 'is_staff', 'created_at', 'updated_at']