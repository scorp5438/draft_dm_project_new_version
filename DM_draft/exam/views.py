from django.http import HttpResponse
from django.shortcuts import render
from exam.forms import AddInternForm


def exam_view(request):
    return render(request, 'index.html')  # Шаблон exam.html, который содержит ваш компонент React


def add_intern(request):
    if request.method == 'POST':
        form = AddInternForm(request.POST)
        if form.is_valid():
            form.fields['cc'] = request.user.company
            form.save()
            return HttpResponse('Успешно отправлено')
        else:
            return HttpResponse('Ошибка отправки')
    else:
        return HttpResponse('Доступ только через POST-запрос')
