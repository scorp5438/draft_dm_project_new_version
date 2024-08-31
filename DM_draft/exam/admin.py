from django.contrib import admin

from exam.models import Exam


class CustomExam(admin.ModelAdmin):
    model = Exam

    fieldsets = (((None, {
        'fields': ('date_exam', 'name_intern', 'cc', 'time_exam', 'name_examiner', 'result_exam', 'comment_exam')}),)
    )

    add_fieldsets = (None, {'fields': ('full_name', 'company', 'post')})

    list_display = ['date_exam', 'name_intern', 'cc', 'time_exam', 'name_examiner']


admin.site.register(Exam, CustomExam)
