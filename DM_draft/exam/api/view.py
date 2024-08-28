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
        'PUT': EditInternSerializer,
        'GET': EditInternSerializer,  # Укажите подходящий сериалайзер для GET-запросов
        # Добавьте другие методы, если необходимо
    }

    def get_serializer_class(self):
        print(self.request.method)
        # Если метод запроса есть в словаре, вернуть соответствующий сериалайзер
        return self.serializer_list.get(self.request.method, AddInternSerializer)

    def perform_create(self, serializer):
        print("Данные, переданные для создания:", self.request.data)
        serializer.save()

