from django.urls import path
from rest_framework import routers
from .view import ExamView, AddIntersViewSet, ResultListView

'''
Адреса по которым будут доступны данные в формате JSON
'''

router = routers.SimpleRouter()
router.register(r'exam', ExamView, basename='exam')
router.register(r'add_intern', AddIntersViewSet, basename='add_intern')

urlpatterns = [
    path('result-list/', ResultListView.as_view(), name='result-list'),
]
urlpatterns += router.urls
