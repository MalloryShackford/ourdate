from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAdminUser

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]