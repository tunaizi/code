from django.urls import path

from . import views
from .tests import mytets
urlpatterns = [
    path('index', views.index, name='index'),  # 这个name是映射到views.index
    mytets(path)
    # path(),  # 这个name是映射到views.login

]
