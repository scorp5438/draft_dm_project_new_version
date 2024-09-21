from django.urls import path

from .views import TestCSRFView

urlpatterns = [
    path('get-csrf-token/', TestCSRFView.get_csrf_token, name='get-csrf-token'),
]
