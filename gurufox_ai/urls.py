from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from dateplan.views import DatePlanListView, DatePlanInfoViewSet, DatePlanViewSet
from mailings.views import MailingsViewSet
from user.viewsets import UserViewSet
from auth.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet
from googleAuth.views import google_auth

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
#router.register(r'dateplan', DatePlanListView, basename='dateplan')
router.register(r'dateplaninfo', DatePlanInfoViewSet, basename='dateplaninfo')
router.register(r'mailings', MailingsViewSet)
router.register(r'users', UserViewSet, basename='users')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
#router.register(r'auth/register', RegisterViewSet, basename='auth-register')
#router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),

    # dateplan
    path('dateplan/', DatePlanListView.as_view(), name="dateplan"),
    path('dateplan/<uuid:pk>/', DatePlanViewSet.as_view({'get': 'retrieve'}), name='dateplan-retrieve'),
    path('dateplan/<uuid:pk>/update/', DatePlanViewSet.as_view({'put': 'update'}), name="dateplan-update"),

    # login to browsable api
    #path('auth/', include('rest_framework.urls', namespace='rest_framework')),

    # authentication
    #path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # users
    path('admin/auth/', include('user.urls')),
    path('users/', UserViewSet.as_view({'get': 'list'}), name='user-list'),
    path('users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve'}), name='user-retrieve'),
    path('users/<int:pk>/update/', UserViewSet.as_view({'put': 'update'}), name='user-update'),
    path('users/<int:pk>/delete/', UserViewSet.as_view({'delete': 'destroy'}), name='user-delete'),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    re_path(r'^auth/', include('djoser.social.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
 

    # stripe
    path('subscription/', include('subscription.urls')),
    path('payment/', include('payment.urls')),

    # google
    # path('auth/o/google-oauth2/', verify_google_id_token, name='exchange_google_idtoken'),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('google_auth/', google_auth),
] 