from django.db import models
from datetime import datetime
from django.db.models.deletion import CASCADE

# Create your models here.


class us_info(models.Model):
    account_id = models.CharField(max_length=100,primary_key=True)
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=30)
    major = models.CharField(max_length=30)
    student_id = models.IntegerField()
    user_email = models.EmailField(max_length=250)
    college_mail = models.EmailField(max_length=250,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)


def upload_profile_image(instance,filename):
    return 'profile-image/' + str(instance.account_id) + '/' + str(datetime.today().strftime("%Y-%m-%d")) +'.jpg'

class Profile(models.Model):
    account_id = models.OneToOneField("us_info",on_delete=models.CASCADE,primary_key=True)
    profile_image = models.ImageField(upload_to=upload_profile_image,null=True)
    nickname = models.CharField(max_length=15,null=True)
    phone_number = models.CharField(max_length=15,null=True)
    introduction = models.TextField(null=True)
    

class My_Board_list(models.Model):
    profile_id = models.ForeignKey("Profile",on_delete=models.CASCADE)
    board_name = models.CharField(max_length=30,null=True)


class Bookmarked_board(models.Model):
    profile_id = models.ForeignKey("Profile",on_delete=models.CASCADE)
    board_name = models.CharField(max_length=30,null=True)


class Bulletin_board(models.Model):
    board_name = models.CharField(max_length=30)
    profile_id = models.ForeignKey("Profile",on_delete=models.SET_NULL,null=True)
    bulletin_board_instruction =  models.CharField(max_length=200)
    create_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)

def upload_post_image(instance,filename):
    return 'posts' + '/' +str(instance.post_id)+'/'+str(datetime.today().strftime("%Y-%m-%d-%H:%M:%S")) +'.jpg'

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    post_title = models.CharField(max_length=30)
    post_contents = models.TextField(null=False)
    bulletin_board_name = models.ForeignKey("Bulletin_board",on_delete=models.SET_NULL,null=True,db_column="board_name")
    profile_id = models.ForeignKey("Profile",on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)


class Post_Image_Url(models.Model):
    post_id = models.ForeignKey("Post",on_delete=CASCADE)
    url = models.ImageField(upload_to=upload_post_image)

class Comment(models.Model):
    post_id = models.ForeignKey("Post",on_delete=CASCADE,primary_key=True)
    profile_id = models.ForeignKey("Profile",on_delete=models.CASCADE)
    comment_text = models.TextField(null=False)
