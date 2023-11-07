from django.apps import AppConfig


class DateplanConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dateplan'
    def ready(self):
        import dateplan.signals
