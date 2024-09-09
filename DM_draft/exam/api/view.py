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
        return queryset

    def perform_update(self, serializer):
        serializer.save()


class AddIntersViewSet(viewsets.ModelViewSet):
    serializer_list = {
        'POST': AddInternSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_list.get(self.request.method, EditInternSerializer)

    def get_queryset(self):
        company = self.request.user.company
        queryset = Exam.objects.filter(cc=company.id) if company.name != "DM" else Exam.objects.all()
        return queryset

    def perform_update(self, serializer):
        serializer.save()

class ResultListView(APIView):
    @classmethod
    def get(cls, request):
        return Response(Exam.result_list)
