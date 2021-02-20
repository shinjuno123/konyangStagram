from django.shortcuts import render
from mainApp.models import *

# Create your views here.


def login(request):
    return render(request, 'signin.html', {})

    
def signup(request):
    if request.method == "GET":
        return render(request, 'signup.html')

    elif request.method == "POST":
        username = request.POST.get['username', None]
        password = request.POST.get['password', None]    
        user_id = request.POST.get['user_id', None]      
        student_id = request.POST.get['student_id', None]
        user_major = request.POST.get['user_major', None]
        user_email = request.POST.get['user_email', None]

        res_data = {}

        if not(username and password and user_id and student_id and user_major and user_email):
            res_data['error'] = '모든 값을 입력해야 합니다.'   
        # Input userdata to models
        else:
            user = User(name = username,
                        password= password,
                        student_id = student_id,
                        major = user_major,
                        user_email = user_email,
                        account_id = user_id)
        return render(request, 'signup.html', res_data)
                    
        



            
             
                        



































