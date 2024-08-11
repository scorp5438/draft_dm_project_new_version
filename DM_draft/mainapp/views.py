from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.shortcuts import render, redirect


# def index(request):
#     return render(request, 'index.html', {})


def login_view(request: HttpRequest):

    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect("/")

        return render(request, 'index.html')

    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return redirect("/")

    return render(request, 'index.html', {"error": "Invalid login"})
