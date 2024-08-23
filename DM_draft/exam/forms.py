from django import forms
from exam.models import Exam


class AddInternForm(forms.ModelForm):
    class Meta:
        model = Exam
        fields = ['date_exam', 'name_intern']

        widgets = {
            'date_exam': forms.DateInput(attrs={'type': 'date'})
        }


class EditInternForm(forms.ModelForm):
    class Meta:
        model = Exam
        fields = ['date_exam', 'name_intern', 'time_exam', 'name_examiner', 'result_exam', 'comment_exam']
        widgets = {
            'date_exam': forms.DateInput(attrs={
                'type': 'date'}),
            'time_exam': forms.TimeInput(attrs={
                'type': 'time',
                'autofocus': 'autofocus'}),
            'name_examiner': forms.Select(attrs={
                'placeholder': 'Выбрать проверяющего',
                'class': 'test2'}),
            'result_exam': forms.Select(attrs={
                'class': 'test2'}),
            'comment_exam': forms.Textarea(attrs={
                'class': 'test2',
                'placeholder': 'Комментарий к зачету',
                'wrap': 'soft',
                'cols': 40,
            })
        }