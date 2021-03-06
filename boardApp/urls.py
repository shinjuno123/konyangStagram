from django.urls import path
from .views import *
app_name = 'boardApp'

urlpatterns = [
    path('',boardPage,name='boardPage'),
    path('question-and-answer/',Question_and_answer,name='question-and-answer'),
]
