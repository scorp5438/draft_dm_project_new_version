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

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('full_name', 'company', 'post', 'operator_type', 'status')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions', 'groups')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('full_name', 'company', 'post')}),
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
