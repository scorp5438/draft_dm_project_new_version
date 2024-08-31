from django.contrib import admin

from exam.models import Exam

from users.models import User


class CustomExam(admin.ModelAdmin):
    model = Exam

    fieldsets = (((None, {
        'fields': ('date_exam', 'name_intern', 'cc', 'time_exam', 'name_examiner', 'result_exam', 'comment_exam')}),)
    )

    add_fieldsets = (None, {'fields': ('full_name', 'company', 'post')})

    list_display = ['date_exam', 'name_intern', 'cc', 'time_exam', 'name_examiner']

    def formfield_for_foreignkey(self, db_field, request, kwargs):
        if db_field.name == 'name_examiner':
            kwargs['queryset'] = User.objects.filter(company__id=1, post='OKK')
        return super().formfield_for_foreignkey(db_field, request, kwargs)


admin.site.register(Exam, CustomExam)