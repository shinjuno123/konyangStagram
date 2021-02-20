import hashlib
import hmac
import base64
import requests
import time,json

timestamp = int(time.time() * 1000)
timestamp = str(timestamp)


url = "https://sens.apigw.ntruss.com/"
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


message = {"to":"01023085374"}

body = {
    "type":"SMS",
    "contentType":"COMM",
    "from":"01091447156",
    "subject":"알림안내",
    "content" : "123458",
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

print(res.json())