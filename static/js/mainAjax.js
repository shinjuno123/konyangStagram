let xhr = new XMLHttpRequest();

const centerChart=document.querySelector('.centerChart');
const show_more_posts_btn= document.getElementById("show-more-posts-button");

show_more_posts_btn.addEventListener("click",()=>{
    call_more_data_of_posts();
})

function call_more_data_of_posts() {
    let posts_count_check = document.querySelectorAll(".post").length;
    xhr.open('POST', '', true);
    var formData = new FormData();
    formData.append("value", posts_count_check);
    formData.append("type", "posts");
    xhr.send(formData);

}


xhr.onload = (json) => {
    if (xhr.status === 200 ) {
        let posts_values = JSON.parse(json.currentTarget.response);
        for(post of posts_values['posts']){
            for(images of posts_values['posts_images']){
                if(post['id'] === images['post_id_id']){
                    image_tags += image_tag(images['url'])
                }
            }
            let div = document.createElement("div");
            div.innerHTML = post_tag(post['profile_id_id'],post['post_title'],post['post_contents'],image_tags);
            centerChart.appendChild(div);
            image_tags = ``;
        }
    }
}

let image_tags = ``;

let image_tag = (post_images_url) => `<img class="post1" src="/media/${post_images_url}" alt="/media/${post_images_url}">`

let post_tag = (nickname,post_title,post_contents,image_tags) => `
<div class="post">
    <div class="postTop">
        <span id="postNickname">${nickname}</span>
        <i class="fas fa-ellipsis-h"></i>
    </div>
    ${image_tags}
    <div class="postBottom">
        <div class="postIcon">
            <i class="fas fa-star"></i>
            <i class="fas fa-thumbs-up"></i>
        </div>
    </div>
    <div>제목 : ${post_title}</div><br>
    <div>${post_contents}</div>
    <div class="postInformation">
        <span id="postMoreView">더보기</span>
    </div>
</div>
`





