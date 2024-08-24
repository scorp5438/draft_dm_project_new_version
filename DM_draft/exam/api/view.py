from rest_framework import viewsets

from .serializers import ExamSerializer, AddInternSerializer
from ..models import Exam


class ExamView(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


class AddIntersViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = AddInternSerializer

    def perform_create(self, serializer):
        print("Данные, переданные для создания:", self.request.data)
        # serializer.save(cc=self.request.user.company)
        serializer.save()


