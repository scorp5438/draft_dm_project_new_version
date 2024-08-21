from rest_framework import routers
from .view import ExamView

'''
Адреса по которым будут доступны данные в формате JSON
'''

router = routers.SimpleRouter()
router.register('exam', ExamView, basename='exam')

urlpatterns = []
urlpatterns += router.urls
