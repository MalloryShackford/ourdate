from oauth2_provider.models import AccessToken
from rest_framework.authentication import BaseAuthentication
from google.oauth2 import id_token
from google.auth.transport import requests
from oauth2client import crypt 
from user.models import User
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class GoogleOAuth2Authentication(BaseAuthentication):
    print(f"GoogleOAuth2Authentication hit!")
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return None

        try:
            token_type, token = auth_header.split()
            if token_type != "Bearer":
                return None
        except ValueError:
            return None
        print("Auth Header:", auth_header)
        print("Token Type:", token_type)
        print("Token:", token)
        
        access_token_valid = self.verify_access_token(token)
        if not access_token_valid:
            try:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)
                
                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    raise ValueError('Wrong issuer.')

                userid = idinfo['sub']
            except (crypt.AppIdentityError, ValueError) as e:
                logger.error(f"Token verification failed: {e}")
                return None
            
            try:
                user, _ = User.objects.get_or_create(google_id=userid)
                return (user, token)
            except User.DoesNotExist:
                logger.error(f"User with google_id {userid} does not exist.")
                return None
        else:
            pass

    def verify_access_token(self, token):
        try:
            access_token_record = AccessToken.objects.get(token=token)
            if access_token_record.is_valid():
                return True
        except AccessToken.DoesNotExist:
            return False
        return False
 