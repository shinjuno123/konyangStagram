from django.shortcuts import render

# Create your views here.
def mainpage(request):
    return render(request,'mainpage.html')

def boardpage(request):
    return render(request,'boardpage.html')

def questionpage(request):
    return render(request,'question.html')
