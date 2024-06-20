from django.urls import path
import apiApp.views as views
urlpatterns = [
    path('login',views.login,name='login'),
    path('create_todo',views.create_todo,name='create_todo'),
    path('initial_call',views.initial_call,name='initial_call'),
    path('Completed',views.Completed,name='Completed'),
    path('InProgress',views.InProgress,name='InProgress'),
    path('Archieved',views.Archieved,name='Archieved'),
    path('complete_task',views.complete_task,name='complete_task'),
    path('archieved_task',views.archieved_task,name='archieved_task'),
    path('delete_task',views.delete_task,name='delete_task'),
    path('update_task',views.update_task,name='update_task'),
]

# python manage.py runserver 0.0.0.0:8000
# apiconfig