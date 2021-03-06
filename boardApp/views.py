from typing import DefaultDict
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from mainApp.models import *
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.
@csrf_exempt
def boardPage(request):


    if request.method == "POST":

        if(request.POST.get('type') == "addPost"):
            return JsonResponse({"state":'addPost',"board_title":request.POST.get('board_title')})
        elif request.POST.get('type') == "deleteBoard":
            print(request.POST.get('board_title'))
            board_nm = request.POST.get('board_title')
            bulletin_board = Bulletin_board.objects.filter(board_name = board_nm).delete()
            print(bulletin_board)
            return JsonResponse({"state":'deleteBoard'})
        elif request.POST.get('type') == "createBoard":
            board_form = Bulletin_board(board_name = request.POST.get('board_name'),bulletin_board_instruction = request.POST.get('board_content'),profile_id= Profile.objects.filter(account_id="shinjuno123")[0])
            board_form.save()
            return JsonResponse({"state":'createBoard'})
        elif request.POST.get('type') == "enterIntoBoard":
            board = Bulletin_board.objects.get(board_name = str(request.POST.get('board_name')))
            posts = Post.objects.filter(bulletin_board_name = board).order_by('-modified_at')[:3]

            images = []

            for post in posts:
                image = Post_Image_Url.objects.filter(post_id=post)
                if len(image) is not 0:
                    images.append(queryset_to_json(image))



            return JsonResponse({"state":'enterIntoBoard',"posts":queryset_to_json(posts),"images":images})
    else : 
        boards = Bulletin_board.objects.all();
        images = Post_Image_Url.objects.all()


        post_contexts= DefaultDict(list)
        board_context = DefaultDict(list)

        count = 1
        for board in boards:
            post = Post.objects.filter(bulletin_board_name=board).values().order_by('-modified_at')[:15]
            board_context[str(count)].append(board)
            post_contexts[str(count)].append(post)
            count += 1

        tmpcontext = {}
    
        for index in post_contexts:
            tmpcontext['board' + str(index)] = get_post_length_at_index(post_contexts,index)
        context = {'post_contexts_for_each_boards':tmpcontext,'board_contexts':board_context,'images':images}

        return render(request,'boardpage.html',context=context)


def Question_and_answer(request):
    return render(request,'question.html')

def get_post_length_at_index(object_list,index):
    return object_list[index][0]


def queryset_to_json(objects):
    arr = []
    for object in objects.values():
        arr.append(object)
    return arr
