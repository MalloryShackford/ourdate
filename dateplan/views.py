from django.core.mail import send_mail, BadHeaderError
import django_filters.rest_framework
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from .models import DatePlan, DatePlanInfo
from .serializers import DatePlanSerializer, DatePlanInfoSerializer
from mailings.models import Mailings
from mailings.serializers import MailingsSerializer
from bouncedEmails.models import BouncedEmails
from bouncedEmails.serializers import BouncedEmailsSerializer
import logging
from user.models import User
import rollbar
from .authentication import GoogleOAuth2Authentication


logger = logging.getLogger('django')


class DatePlanInfoViewSet(viewsets.ModelViewSet):
    queryset = DatePlanInfo.objects.all().order_by('uuid')
    serializer_class = DatePlanInfoSerializer
    authentication_classes = [JWTAuthentication, OAuth2Authentication, GoogleOAuth2Authentication]
    # permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['post', 'get', 'options'])
    def generate(self, request):
        # Get user's input from the request data
        user_input = request.data.get('input', '')
        logger.info('starting the dateplaininfo save')
        logger.info(user_input)
    
    def create(self, request):
        # user_instance = get_object_or_404(User, pk=request.data['user'])
        user_instance = None
        if request.user.is_authenticated:
            user_instance = request.user
        else:
            user_id = request.data.get('user')
            logger.error('Warning: Unauthenticated user. Using user supplied UID ' + str(user_id))
            if user_id:
                user_instance = get_object_or_404(User, pk=user_id)
        if not user_instance:
            raise ValueError("No valid user provided")
        
        date_plan_info = DatePlanInfo.objects.create(
            user=user_instance,
            location=request.data.get('location', ''),
            budget=request.data.get('budget', ''),
            date=request.data.get('date', ''),
            time=request.data.get('time', ''),
            vibe=request.data.get('vibe', '')
        )
        
        if not date_plan_info: 
            rollbar.report_message("Detected an empty date plan", "warning")
        try:
            serializer = DatePlanInfoSerializer(date_plan_info)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error while saving date_plan: {e}")
            rollbar.report_exc_info()
            
        return Response({"error": "Failed to save DatePlanInfo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# TODO: this can be refactored and included into DatePlanViewSet
# if done, can change this filename to viewsets.py and update imports
class DatePlanListView(generics.ListAPIView):
    queryset = DatePlan.objects.all().order_by('uuid')
    serializer_class = DatePlanSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['plan_info','uuid']

    @action(detail=True, methods=['post'])
    def generate(self, request):
        # Get user's input from the request data
        user_input = request.data.get('input', '')

        date_info = {}
        date_info['vibe'] = request.data.get('vibe', '')
        date_info['location'] = request.data.get('location', '')
        date_info['budget'] = request.data.get('budget', '')
        date_info['date'] = request.data.get('date', '')
        date_info['time'] = request.data.get('time', '')

class DatePlanViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication, OAuth2Authentication, GoogleOAuth2Authentication]
    permission_classes = [IsAuthenticated]
    serializer_class = DatePlanSerializer

    def get_object(self, pk):
        return get_object_or_404(DatePlan, pk=pk)
    
    def retrieve(self, request, pk=None):
        if not pk:
            rollbar.report_message("Attempted to retrieve DatePlan with empty UUID", "warning")
            return Response({"error": "Invalid UUID provided."}, status=status.HTTP_400_BAD_REQUEST)
        dateplan = self.get_object(pk)
        if dateplan.user == self.request.user:
            serializer = self.serializer_class(dateplan)
            return Response(serializer.data)
        return Response({"error": "You don't have permission to access this dateplan."}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None):
        if not pk:
            rollbar.report_message("Attempted to update DatePlan with empty UUID", "warning")
            return Response({"error": "Invalid UUID provided."}, status=status.HTTP_400_BAD_REQUEST)
        dateplan = self.get_object(pk)
        if dateplan.user == self.request.user:
            serializer = self.serializer_class(dateplan, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "You do not have permission to update this dateplan."}, status=status.HTTP_403_FORBIDDEN)
