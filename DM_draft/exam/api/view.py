from rest_framework import viewsets

from .serializers import ExamSerializer, AddInternSerializer, EditInternSerializer
from ..models import Exam


class ExamView(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


class AddIntersViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()

    serializer_list = {
        'POST': AddInternSerializer,
        'PUT': EditInternSerializer
    }

    def get_serializer_class(self):
        if self.serializer_list.get(self.request.method):
            return self.serializer_list[self.request.method]
        else:
            return AddInternSerializer

    def perform_create(self, serializer):
        print("Данные, переданные для создания:", self.request.data)
        serializer.save()
