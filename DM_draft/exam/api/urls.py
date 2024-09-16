from django.urls import path
from rest_framework import routers
from .view import ExamView, AddIntersViewSet, ResultListView, TrainingFormListView

'''
Адреса по которым будут доступны данные в формате JSON
'''

router = routers.SimpleRouter()
router.register(r'exam', ExamView, basename='exam')
router.register(r'add_intern', AddIntersViewSet, basename='add_intern')

urlpatterns = [
    path('result_list/', ResultListView.as_view(), name='result_list'),
    path('training_form_list/', TrainingFormListView.as_view(), name='training_form_list'),
]
urlpatterns += router.urls
