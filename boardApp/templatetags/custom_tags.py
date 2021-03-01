from django import template
register = template.Library()

@register.simple_tag
def get_title_at_index(object_list,index):
    return object_list[str(index)][0].board_name


@register.simple_tag
def get_content_at_index(object_list,index):
    return object_list[str(index)][0].bulletin_board_instruction





@register.simple_tag
def get_post_by_index(object_list,index):
    return object_list[index]


@register.simple_tag
def get_image(images,postId):
    image_to_return = None
    for image in images:
        if str(image.post_id.id) == str(postId) :
            image_to_return = image.url
            break;
    return image_to_return