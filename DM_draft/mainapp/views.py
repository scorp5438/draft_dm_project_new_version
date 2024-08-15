from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render, redirect
import json


@login_required
def index(request):
    return render(request, 'index.html', {})


# def login_view(request):
#     if request.method == 'POST':
#         import json
#         data = json.loads(request.body)
#         username = data.get('username')
#         password = data.get('password')
#         user = authenticate(request, username=username, password=password)
#
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'success': True})
#         else:
#             return JsonResponse({'success': False, 'message': 'Invalid login'}, status=401)
#     if request.method == 'GET':
#         if request.user.is_authenticated:
#             return redirect("/")
#
#         return render(request, 'index.html')
#     return JsonResponse({'error': 'Invalid request method'}, status=405)


def login_view(request: HttpRequest):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect("/")

        return render(request, 'index.html')
    data = json.loads(request.body)

    username = data.get("username")
    password = data.get("password")
    # username = request.POST['username']
    # password = request.POST['password']
    user = authenticate(request, username=username, password=password)

    if user is not None:
        print("kdsfhl", user)

        login(request, user)
        return JsonResponse({'success': True})

    return render(request, 'index.html', {"error": "Invalid login"})
