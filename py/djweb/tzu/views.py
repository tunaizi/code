from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    print(request,'---------0000')
    return HttpResponse("Hello, word")


def login(request):
    return HttpResponse("Hello, this login")
