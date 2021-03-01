from django.urls import path
from .views import *
app_name = 'mainApp'

urlpatterns = [
    path('',mainpage,name='mainPage'),
    path('create-post/',create_post,name="create-post")
]
