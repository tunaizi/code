from django.shortcuts import render
from django.http import HttpResponse
import json


from django.http import HttpResponse


def index(request):
    print(request, '---------0000')
    return HttpResponse("Hello, word")


def login(request):

    # def getvs(n):
    #     ks = {e: n for e in ['id', "um", "uw", "msg"]}
    #     return ks
    # ls = [getvs(item) for item in range(0, 100) if item % 2 == 0]
    ls = [{}.fromkeys(['id', "um", "uw", "msg"], item)
          for item in range(0, 100) if item % 2 == 0]
    wl = ls.index({"id": 60, "um": 60, "uw": 60, "msg": 60})
    print(wl)

    return HttpResponse(json.dumps({"data": ls}, ensure_ascii=False), content_type="application/json,charset=utf-8")


def test(request):
    result = {"result": 0, "msg": "执行成功"}
    # json返回为中文
    return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")
# Create your views here.
