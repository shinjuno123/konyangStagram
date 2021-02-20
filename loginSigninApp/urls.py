from django.urls import path,include
from .views import *

app_name = 'loginSigninApp'

urlpatterns = [

    path('', login, name='login'),    # /login/
    path('signup/',signup, name='signup'), # /login/signup/
    
]

