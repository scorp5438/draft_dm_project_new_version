from rest_framework import viewsets, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError

from .serializers import ExamSerializer, AddInternSerializer, EditInternSerializer
from ..models import Exam


class ExamView(viewsets.ModelViewSet):
    serializer_class = ExamSerializer

    def get_queryset(self):
        company = self.request.user.company
        queryset = Exam.objects.filter(cc=company.id) if company.name != "DM" else Exam.objects.all()
        return queryset.order_by('date_exam')

    def get_serializer_context(self):
        # Передаем текущий запрос в контекст сериализатора
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_update(self, serializer):
        try:
            serializer.save()
            # instance = serializer.save() # Если сохраненные данные необходимо использовать дальше
        except ValidationError as e:
            raise serializers.ValidationError(e.detail)


class AddIntersViewSet(viewsets.ModelViewSet):
    serializer_list = {
        'POST': AddInternSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_list.get(self.request.method, EditInternSerializer)

    def get_queryset(self):
        company = self.request.user.company
        queryset = Exam.objects.filter(cc=company.id) if company.name != "DM" else Exam.objects.all()
        return queryset.order_by('date_exam')

    def perform_update(self, serializer):
        try:
            serializer.save()
            # instance = serializer.save() # Если сохраненные данные необходимо использовать дальше
        except ValidationError as e:
            raise serializers.ValidationError(e.detail)


class ResultListView(APIView):
    @classmethod
    def get(cls, request):
        return Response(Exam.result_list)


class TrainingFormListView(APIView):
    @classmethod
    def get(cls, request):
        return Response(Exam.training_forms_list)
