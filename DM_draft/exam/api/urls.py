from rest_framework import routers
from .view import ExamView, AddIntersViewSet

'''
Адреса по которым будут доступны данные в формате JSON
'''

router = routers.SimpleRouter()
router.register(r'exam', ExamView, basename='exam')
router.register(r'add_intern', AddIntersViewSet, basename='add_intern')

urlpatterns = []
urlpatterns += router.urls
