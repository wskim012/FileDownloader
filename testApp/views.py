from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect,JsonResponse
import pymssql
from .db import get_credentials

# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    print("hello")
    cursor = getDB()
    cursor.execute('SELECT * FROM projects;')
    row = cursor.fetchone()
    project_list = []
    while row:
        project_list.append({
            'project_id' : row[0],
            'project_name' : row[1],
            'project_date' : row[2],
        })
        print(project_list)
        row = cursor.fetchone()
    if request.method == 'GET':
        start = request.GET.get("action",None)
        auth_option = request.GET.get("auth_option", None)
        if start != None:
            data = {
                'project_list' : project_list,
            }
            return JsonResponse(data)
    return render(request, 'index.html')

def getDB():
    db = get_credentials()
    conn = pymssql.connect(server=db['server'],port=db['port'],database=db['database'],user=db['user'],password=db['password'],login_timeout=300)
    cursor = conn.cursor()
    return cursor

def getFileDetail(request):
    if request.method == 'GET':
        projectId = request.GET.get('projectId', None)
        print(projectId)
        cursor = getDB()
        cursor.execute("SELECT * FROM files WHERE project_id = "+ str(projectId)+ ";")
        row = cursor.fetchone()
        file_list = []
        while row:
            file_list.append({
                'file_id' : row[0],
                'file_name' : row[2],
                'file_upload_date' : row[3],
                'file_url' : row[4],
            })
            row = cursor.fetchone()
        data = {
            'file_list' : file_list,
        }
        return JsonResponse(data)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
