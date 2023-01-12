from django.test import TestCase
from . import views
# Create your tests here.
def mytets(path):
  return path('login', views.login, name='login')
  # pass