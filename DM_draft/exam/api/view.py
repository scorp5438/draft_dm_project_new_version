from rest_framework import viewsets

from .serializers import ExamSerializer
from ..models import Exam


class ExamView(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
