from django.shortcuts import render
from django.shortcuts import redirect, render
from django.http.response import JsonResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
import ast
# Create your views here.
@csrf_exempt
def mainpage(request):
    if(request.method == "POST"):
        pv = request.POST.dict()
        print(pv)
        posts = Post.objects.order_by('-modified_at')[int(pv['value']):int(pv['value'])+3] # value['value'] is the last number of post lists before xhr
        posts_image = Post_Image_Url.objects
        context = {'value':pv['value'],'posts':queryset_to_json(posts),'posts_images':queryset_to_json(posts_image),'type':'posts'}
        return JsonResponse(context) # send data with Json
    else:
        #load model posts and posts images
        posts = Post.objects.order_by('-modified_at')[:3]
        posts_image = Post_Image_Url.objects
        #load model Bulletin_board
        bulletin_board = Bulletin_board.objects.order_by('modified_at')[:10]
        context = { 'posts' : queryset_to_json(posts),'posts_images':queryset_to_json(posts_image),'bulletin_board':queryset_to_json(bulletin_board)}
        return render(request,'mainPage.html',context)


def create_post(request):
    if(request.method == "POST"):
        pv = request.POST
        bulletin_board_id = Bulletin_board.objects.get(board_name=pv['board']) # 게시판 아이디 가져오기
        profile_id = Profile.objects.get(account_id_id= pv['writer']) # 사용자 아이디 가져오기
        text_data = Post(post_title=pv['title'],post_contents=pv['contentName'],bulletin_board_name= bulletin_board_id,profile_id=profile_id)
        text_data.save()

        created_post = Post.objects.get(post_title=pv['title'],post_contents=pv['contentName'],bulletin_board_name= bulletin_board_id,profile_id=profile_id)

        #ajax로 넘겨 받은 이미지리스트 불러오기
        images_list = request.FILES.getlist('file-zone')
        print(images_list)
        # #위에서 방금 생성한 포스트의 객체(key) id와 그에 대한 이미지 들을 저장
        for image in images_list:
            form = Post_Image_Url(post_id=created_post,url = image)
            form.save()
        return redirect('mainApp:mainPage')
    else:
        bulletin_boards = Bulletin_board.objects.all()
        context = {'bulletin_boards':bulletin_boards}
        return render(request,'createpostpage.html',context)
        # createpostpage
# change queryset to json when there is array in
def queryset_to_json(objects):
    arr = []
    for object in objects.values():
        arr.append(object)
    return arr
