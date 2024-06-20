from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password

from apiApp.models import user_cred, todo_data

from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
@api_view(['POST'])
def login(request,format=None):
    username = request.data['username']
    password = request.data['password']
    try:
        user_get = user_cred.objects.get(username = username)
    except:
        return Response({'message':'User does not exist'})
    if(check_password(password,user_get.password)):
        return Response({
                            'message':'Successfully logined',
                        })
    else:
        return Response({
                            'message':'Incorrect credentials',
                        })

@api_view(['POST'])
def create_todo(request,format=None):
    title_input = request.data['title']
    desc_input = request.data['desc']
    status_input = 'In Progress'
    obj = todo_data(
                    title = title_input,
                    desc = desc_input,
                    status = status_input
                    )
    obj.save()

    return Response({'message':'todo created successfully'})
    
@api_view(['GET'])
def initial_call(request, format=None):
    All =   todo_data.objects.all().values().count()
    Completed = todo_data.objects.filter(status = 'Completed').values().count()
    InProgress = todo_data.objects.filter(status = 'In Progress').values().count()
    Archieved = todo_data.objects.filter(status = 'Archieved').values().count()
    stat = [
        {"label": "All",
                "value": All},
        {"label": "Completed",   
                "value": Completed},
        {"label": "Inprogress",
                "value": InProgress},
        {"label": "Archieved",
                "value": Archieved},     
    ]
    todo = todo_data.objects.exclude(status = 'Archieved').all().values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'stats': stat,
        'todo_data': todo,
    })

@api_view(['GET'])
def Completed(request, format = None):
    obj = todo_data.objects.filter(status = 'Completed').values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'todo_data': obj
    })

@api_view(['GET'])
def InProgress(request, format = None):
    obj = todo_data.objects.filter(status = 'In Progress').values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'todo_data': obj
    })

@api_view(['GET'])
def Archieved(request, format = None):
    obj = todo_data.objects.filter(status = 'Archieved').values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'todo_data': obj
    })

@api_view(['POST'])
def complete_task(request, format = None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).update(status = 'Completed')
    
    All =   todo_data.objects.all().values().count()
    Completed = todo_data.objects.filter(status = 'Completed').values().count()
    InProgress = todo_data.objects.filter(status = 'In Progress').values().count()
    Archieved = todo_data.objects.filter(status = 'Archieved').values().count()
    stat = [
        {"label": "All",
                "value": All},
        {"label": "Completed",   
                "value": Completed},
        {"label": "Inprogress",
                "value": InProgress},
        {"label": "Archieved",
                "value": Archieved},     
    ]
    todo = todo_data.objects.exclude(status = 'Archieved').all().values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'stats': stat,
        'todo_data': todo,
    })

@api_view(['POST'])
def archieved_task(request, format = None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).update(status = 'Archieved')
    
    All =   todo_data.objects.all().values().count()
    Completed = todo_data.objects.filter(status = 'Completed').values().count()
    InProgress = todo_data.objects.filter(status = 'In Progress').values().count()
    Archieved = todo_data.objects.filter(status = 'Archieved').values().count()
    stat = [
        {"label": "All",
                "value": All},
        {"label": "Completed",   
                "value": Completed},
        {"label": "Inprogress",
                "value": InProgress},
        {"label": "Archieved",
                "value": Archieved},     
    ]
    todo = todo_data.objects.exclude(status = 'Archieved').all().values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'stats': stat,
        'todo_data': todo,
    })

@api_view(['DELETE'])
def delete_task(request, format = None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).delete()

    All =   todo_data.objects.all().values().count()
    Completed = todo_data.objects.filter(status = 'Completed').values().count()
    InProgress = todo_data.objects.filter(status = 'In Progress').values().count()
    Archieved = todo_data.objects.filter(status = 'Archieved').values().count()
    stat = [
        {"label": "All",
                "value": All},
        {"label": "Completed",   
                "value": Completed},
        {"label": "Inprogress",
                "value": InProgress},
        {"label": "Archieved",
                "value": Archieved},     
    ]
    todo = todo_data.objects.exclude(status = 'Archieved').all().values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'stats': stat,
        'todo_data': todo,
    })

@api_view(['PUT'])
def update_task(request, format = None):
    task_id = request.data['id']
    task_title = request.data['title']
    task_desc = request.data['desc']

    obj = todo_data.objects.filter(id = task_id).update(title = task_title, desc = task_desc)

    All =   todo_data.objects.all().values().count()
    Completed = todo_data.objects.filter(status = 'Completed').values().count()
    InProgress = todo_data.objects.filter(status = 'In Progress').values().count()
    Archieved = todo_data.objects.filter(status = 'Archieved').values().count()
    stat = [
        {"label": "All",
                "value": All},
        {"label": "Completed",   
                "value": Completed},
        {"label": "Inprogress",
                "value": InProgress},
        {"label": "Archieved",
                "value": Archieved},     
    ]
    todo = todo_data.objects.exclude(status = 'Archieved').all().values('id','title','desc','status')
    return Response({
        'message':'successfull',
        'stats': stat,
        'todo_data': todo,
    })




# @api_view(['POST'])
# def create_user(request, format=None):
#     user = request.data['username']
#     password = request.data['password'] 
#     enc_pass = make_password(password)  
#     obj = user_cred(
#         username = user,
#         password = enc_pass
#     )
#     obj.save()
#     return Response({'message':'User created'})

# makepassword and checkpassword
# PATCH is used for updating a single field