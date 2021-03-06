xhr = new XMLHttpRequest()
addPost = document.querySelectorAll('.addPost').forEach(inputelement =>{
    inputelement.addEventListener("click",()=>{
        const board_title = inputelement.closest('.postList').children[0].querySelector('.postTitle')
        xhr.open('POST', '', true);
        let form = new FormData();
        form.append("type","addPost")
        form.append("board_title",board_title.innerText);
        xhr.send(form);
    })
})

addPost = document.querySelectorAll('.deleteBoard').forEach(inputelement =>{
    inputelement.addEventListener("click",()=>{
        const board_title = inputelement.closest('.postList').children[0].querySelector('.postTitle')
        console.log(board_title.innerText)
        xhr.open('POST', '', true);
        let form = new FormData();
        form.append("type","deleteBoard");
        form.append("board_title",board_title.innerText);
        xhr.send(form);
    })
})

function createBoardButton(){
    const board_name = document.querySelector('#newBoard-title').value
    const board_content = document.querySelector('#newBoard-explain').value
    console.log(board_name + "," + board_content);
    xhr.open('POST', '', true);
    let form = new FormData();
    form.append('board_name',board_name);
    form.append('board_content',board_content);
    form.append("type","createBoard");
    xhr.send(form);
}
//e.path[2].children[0].children[0].innerText
function enterIntoBoard(e){
    const board_name= e.path[2].children[0].children[0].innerText;
    xhr.open('POST', '', true);
    let form = new FormData();
    form.append('board_name',board_name);
    form.append("type","enterIntoBoard");
    xhr.send(form);
}



xhr.onload = (json)=>{
    if (xhr.status === 200 ) {
        console.log(JSON.parse(json.currentTarget.response).state)
        if(JSON.parse(json.currentTarget.response).state === 'deleteBoard'){
            window.location.reload()
            alert("삭제완료");
        }else if(JSON.parse(json.currentTarget.response).state === 'addPost'){
            let mainURL = window.location.href.slice(0,-7);
            window.location.href = mainURL + create_page_URL + `?board=${JSON.parse(json.currentTarget.response).board_title}`;
        }else if(JSON.parse(json.currentTarget.response).state === 'createBoard'){
            alert("생성완료");
        }else if(JSON.parse(json.currentTarget.response).state === 'enterIntoBoard'){
            alert("세부게시판 페이지 진입 성공");
            for(post of JSON.parse(json.currentTarget.response).posts){
                makePosts(post,JSON.parse(json.currentTarget.response).images);
                // console.log(JSON.parse(json.currentTarget.response).images)
            }
        }
    }else{
        console.log("failed access to create-post");
    }
}

function makePosts(post,posts_images){
    // console.log(images)

    for (post_images of posts_images){
        for(post_image of post_images){
            if(post_image.post_id_id === post.id){
                board_image_tags += board_image_tag(post_image.url)
            }

        }
    }

    let div = document.createElement("div");
    div.className = "post";
    div.innerHTML = (board_post_tag(post.profile_id_id,post.post_title,post.post_contents,board_image_tags));
    console.log(div);
    document.querySelector("#posts").appendChild(div);
    board_image_tags = ``;
}
let board_image_tags = ``;
let board_image_tag = (post_images_url) => `<img class="post1" src="/media/${post_images_url}" alt="/media/${post_images_url}">`
let board_post_tag = (nickname,post_title,post_contents,image_tags) => `

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

`

document.querySelectorAll('.postChart').forEach(e=>{
    if (e.children.length === 0){
        const noPost = document.createElement('p');
        noPost.classList.add('noPost');
        noPost.innerHTML = "게시물이 존재하지 않습니다.";
        e.appendChild(noPost);
    }
}); 