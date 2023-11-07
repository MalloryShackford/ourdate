from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from oauth2client import client
from rest_framework_simplejwt.tokens import RefreshToken as SimpleJWTRefreshToken
from user.models import User
from oauth2_provider.models import AccessToken, Application, RefreshToken
from django.utils import timezone
from datetime import timedelta
from django.utils.crypto import get_random_string
from dateplan.authentication import GoogleOAuth2Authentication
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
import json

def create_tokens_for_user(user):
    refresh = SimpleJWTRefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }

@api_view(['POST'])
@authentication_classes([GoogleOAuth2Authentication, OAuth2Authentication])
def google_auth(request):
    print("google_auth hit!")
    # data = request.data
    # if isinstance(data, str):
    #     try: 
    #         data = json.loads(data)
    #     except json.JSONDecodeError:
    #         pass
    id_token = request.data.get('id_token')
    print(f"Received id_token: {id_token}")
    if not id_token:
        return Response({"error": "No id_token provided."}, status=400)
    
    try:
        expected_audience = "128261348367-1hrj09s6822obkmeaec0o138968loaqo.apps.googleusercontent.com"
        idinfo = client.verify_id_token(id_token, expected_audience)
        print(f"Token verification successful. Received idinfo: {idinfo}")
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError("Wrong issuer.")
    except ValueError as e:
        return Response({"error": str(e)}, status=400)
        
    existing_user_with_email = User.objects.filter(email=idinfo['email']).first()

    if existing_user_with_email:
        conflicting_user = User.objects.filter(google_id=idinfo['sub']).exclude(email=idinfo['email']).first()
        if conflicting_user:
            conflicting_user.google_id = None
            conflicting_user.save()
            print(f"Removed google_id from conflicting user with email: {conflicting_user.email}")

        existing_user_with_email.google_id = idinfo['sub']
        existing_user_with_email.save()
        user = existing_user_with_email
        print(f"User with email {idinfo['email']} merged with google_id: {idinfo['sub']}")
    else:
        user_id = idinfo['sub']
        unique_username = f"google_{user_id}"
        counter = 1

        while User.objects.filter(username=unique_username).exists():
            unique_username = f"google_{user_id}_{counter}"
            counter += 1

        user, created = User.objects.get_or_create(google_id=user_id, defaults={'username': unique_username, 'email': idinfo['email']})
        print(f"User {'created' if created else 'retrieved'} with google_id: {user_id}")
    
    tokens = create_tokens_for_user(user)
    return Response(tokens)