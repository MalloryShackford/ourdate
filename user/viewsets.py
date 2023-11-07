from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user.models import User
from user.serializers import UserSerializer
from rest_framework import status


class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self, pk):
        return get_object_or_404(User, pk=pk)        

    def list(self, request):
        if self.request.user.is_superuser:
            queryset = User.objects.all()
            serializer = self.serializer_class(queryset, many=True)
        else:
            user = self.get_object(self.request.user.pk)
            serializer = self.serializer_class(user)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        if pk and int(pk) == self.request.user.pk:
            user = self.get_object(pk)
            serializer = self.serializer_class(user)
            return Response(serializer.data)
        return Response({"error": "You don't have permission to access this resource."}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None):
        if pk and int(pk) == self.request.user.pk:
            user = self.get_object(pk)
            serializer = self.serializer_class(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "You do not have permission to update this user."}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, pk=None):
        if pk and (self.request.user.is_superuser or int(pk) == self.request.user.pk):
            user = self.get_object(pk)
            user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "You do not have permission to delete this user."}, status=status.HTTP_403_FORBIDDEN)