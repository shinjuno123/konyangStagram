from django.shortcuts import render
from mainApp.models import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
import json
import hashlib
import hmac
import base64
import requests
import time,json
import string,random
# Create your views here.


def login(request):
    return render(request, 'signin.html', {})

@csrf_exempt
def signup(request):
    if request.method == "GET":
        return render(request, 'signup.html')

    elif request.method == "POST":
        if(request.POST['type'] == 'certification'):
            randomNum = makeRandomNum(8)
            sendMessage(request.POST['username'],request.POST['phone_number'],randomNum)
            context = {'state':'complete','randomNum':randomNum}
            return JsonResponse(json.dumps(context),safe=False)
        elif(request.POST['type'] == 'input_user'):            
            username = request.POST['username']
            password = request.POST['password']    
            user_id = request.POST['user_id']      
            student_id = request.POST['student_id']
            user_major = request.POST['user_major']
            user_email = request.POST['user_email']
            res_data = {}
            if not(username and password and user_id and student_id and user_major and user_email):
                res_data['error'] = '모든 값을 입력해야 합니다.'   
                print("모든값입력 필요")
        # Input userdata to models
            else:
                user = us_info(name = username,
                            password= password,
                            student_id = student_id,
                            major = user_major,
                            user_email = user_email,
                            account_id = user_id)
                user.save()
                print("세이브완료")
            return render(request, 'signup.html', res_data)
                    

def makeRandomNum(length):
    _Length = length
    string_pool = string.digits
    result = ""
    for i in range(_Length):
        result += random.choice(string_pool)
    return result


def sendMessage(name,phoneNumber,randomNumber):
    print(name + "," + phoneNumber)
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)
    url = "https://sens.apigw.ntruss.com"
    requestUrl = "/sms/v2/services/"
    requestUrl2 = "/messages"
    serviceId = "ncp:sms:kr:263907291783:checking_identification"
    access_key = "F4OkzLuEx7hsYwvITZph"

    uri = requestUrl + serviceId + requestUrl2
    apiUrl = url + uri


    def make_signature(uri,access_key):
        secret_key = "fkLllWfvlPdE06CLjSpOBu8Q5xdBC98ViZaUJGq9"
        secret_key = bytes(secret_key,'UTF-8')
        method = "POST"
        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message,"UTF-8")
        signingKey = base64.b64encode(hmac.new(secret_key,message,digestmod=hashlib.sha256).digest()) 
        return signingKey


    message = {"to":phoneNumber}

    body = {
        "type":"SMS",
        "contentType":"COMM",
        "from":"01091447156",
        "subject":name+"님",
        "content" : "다음의 숫자를 입력해주세요\n"+randomNumber,
        "messages":[message]
    }

    body2 = json.dumps(body)
    headers = {
        'Content-Type':'application/json; charset=utf-8',
        'X-ncp-apigw-timestamp':timestamp,
        'x-ncp-iam-access-key':access_key,
        'x-ncp-apigw-signature-v2':make_signature(uri,access_key)
    }

    res = requests.post(apiUrl,headers=headers,data=body2)

    res.request
    res.status_code
    res.raise_for_status()

    return res.json()
             
                        



































