from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Companies, User


class CustomUserAdmin(UserAdmin):
    '''
    Настройка регистрации модели User в админ панели
    fieldsets: добавление полей company и post к стандартным полям при просмотре и редактировании пользователя
    add_fieldsets: поля, которые отображаются при создании пользователя
    list_display: поля, которые будет видно при отображении списка пользователей
    '''
    model = User

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('company', 'post')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('company', 'post')}),
    )

    list_display = ['username', 'is_staff', 'company', 'post']


class CompaniesAdmin(admin.ModelAdmin):
    '''
    Настройка регистрации модели Companies
    prepopulated_fields: автоматическое создание slug, при создании компании на основании названия
    '''
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(User, CustomUserAdmin)
admin.site.register(Companies, CompaniesAdmin)
