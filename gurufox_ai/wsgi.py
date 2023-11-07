"""
WSGI config for gurufox_ai project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from gurufox_ai.settings import ROLLBAR
import rollbar

rollbar.init(**ROLLBAR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gurufox_ai.settings')

application = get_wsgi_application()
