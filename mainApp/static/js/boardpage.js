//Selector
const postClicks = document.querySelectorAll('.board-click');
let postLists = document.querySelectorAll('.postList');
const postCounts = document.querySelectorAll('.postCount');
const centerChart = document.querySelector('.centerChart');
const newBoard = document.querySelector('.newBoard');
const logoBoardIcon = document.getElementById('logo-board-icon');
const logoBoard = document.getElementById('logo-board');
const posts = document.getElementById('posts');
const addNewBoard = document.getElementById('add_btn');
let editBoards = document.querySelectorAll('.postMenu>i');
const postImgs = document.querySelectorAll('.post1');
const postContents = document.querySelectorAll('.postContent');
const clicks = document.querySelectorAll('.post-click');


//function
//postContent 이미지 없는 게시글
function contentFunc(){
    for(let postContent of postContents){
        postContent.parentElement.querySelector('.postHover').style.display = "flex";
    }
}


//postHover
for(let postImg of postImgs){
    postImg.addEventListener('mouseover', function(){
        let hover = postImg.parentElement;
        hover.querySelector('.postHover').style.display = "flex";
        hover.querySelector('.postHover').addEventListener('mouseout', function(){
            hover.querySelector('.postHover').style.display = "none";
        });
    });
}

//게시판 메뉴
function editBoardFunc(e){
    let elem = e.target.parentElement.parentElement.parentElement;
    e.target.classList.toggle('clicked');
    if(e.target.classList[2] === "clicked"){
        elem.querySelector('.postChart').style.opacity = "20%";
        elem.querySelector('.editBoard').style.display = "flex";
    }else{
        elem.querySelector('.postChart').style.opacity = "100%";
        elem.querySelector('.editBoard').style.display = "none";
    }
    
}

//새 게시판 생성
function addNewBoardFunc() {
    if(document.getElementById('newBoard-title').value === ""){
        alert('게시판 제목을 입력하세요!');
    }
    else if(document.getElementById('newBoard-explain').value === ""){
        alert('한 줄 설명을 입력하세요!');
    }
    else{
        document.getElementById("modal").style.display="none";
        //Create postTitle
        const postTitle = document.createElement('p');
        postTitle.classList.add('postTitle');
        postTitle.innerHTML= document.getElementById('newBoard-title').value;
        //Create postExplain
        const postExplain = document.createElement('p');
        postExplain.classList.add('postExplain');
        postExplain.innerHTML = document.getElementById('newBoard-explain').value;
        //Create board-click
        const boardClick = document.createElement('div');
        boardClick.classList.add('board-click');
        boardClick.appendChild(postTitle);
        boardClick.appendChild(postExplain);
        //Create postCount
        const postCount = document.createElement('p');
        postCount.classList.add('postCount');
        postCount.innerHTML = "posts 0";
        //Create editboardIcon
        const editboardIcon = document.createElement('i');
        editboardIcon.classList.add('fas');
        editboardIcon.classList.add('fa-ellipsis-h');
        //Create postMenu
        const postMenu = document.createElement('div');
        postMenu.classList.add('postMenu');
        postMenu.appendChild(postCount);
        postMenu.appendChild(editboardIcon);
        //Create board-title
        const boardTitle = document.createElement('div');
        boardTitle.classList.add('board-title');
        boardTitle.appendChild(boardClick);
        boardTitle.appendChild(postMenu);
        //Create NoPost
        const noPost = document.createElement('p');
        noPost.classList.add('noPost');
        noPost.innerHTML = "게시물이 존재하지 않습니다.";
        //Create Div
        const div = document.createElement('div');
        div.appendChild(noPost);
        //Create li
        const li = document.createElement('li');
        li.appendChild(div);
        //Create postChart
        const postChart = document.createElement('ul');
        postChart.classList.add('postChart');
        postChart.id = 'scroll';
        postChart.appendChild(li);
        //Create p
        const addPost = document.createElement('p');
        addPost.classList.add('addPost');
        addPost.innerHTML = "게시물 추가"
        //Create p
        const deleteBoard = document.createElement('p');
        deleteBoard.classList.add('deleteBoard');
        deleteBoard.innerHTML = "게시판 삭제";
        //Create editBoard
        const editBoard = document.createElement('div');
        editBoard.classList.add('editBoard');
        editBoard.appendChild(addPost);
        editBoard.appendChild(deleteBoard);
        //Create postList
        const postList =  document.createElement('div');
        postList.classList.add('postList');
        postList.appendChild(boardTitle);
        postList.appendChild(postChart);
        postList.appendChild(editBoard);
        //Append centerChart
        centerChart.appendChild(postList);

        //게시판 메뉴 
        editboardIcon.addEventListener('click',editBoardFunc);
    }
}

//새 게시판 생성 모달 창
newBoard.addEventListener('click', function() {
    document.getElementById("modal").style.display="flex";
    document.getElementById("modal_close_btn").addEventListener('click', function() {
        document.getElementById("modal").style.display="none";
    })
})

//해당 게시판으로 들어가기
for(let postClick of postClicks){
    postClick.addEventListener('click', function(){
    for(let postList of postLists){
        postList.style.display = "none";
    }
    newBoard.style.display = "none";
    logoBoardIcon.style.display="flex";
    logoBoard.innerHTML = postClick.querySelector('.postTitle').innerHTML;
    centerChart.style.display = "none";
    posts.style.display = 'flex'; //메인 페이지처럼 해당 게시판의 게시물들 표시
    });
}




//Event Listener
addNewBoard.addEventListener('click',addNewBoardFunc);//새 게시판 생성
for(let editBoard of editBoards){
    editBoard.addEventListener('click',editBoardFunc);//게시판 메뉴
}
window.addEventListener('load', contentFunc());//텍스트게시글




//마우스 드래그로 좌우 스크롤
const sliders = document.querySelectorAll('.postChart');
let isMouseDown = false;
let startX, scrollLeft;

for(let slider of sliders){
    slider.addEventListener('mousedown',(e) => {
        isMouseDown = true;
        slider.classList.add('active');
    
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    })

    slider.addEventListener('mouseleave',() => {
        isMouseDown = false;
        slider.classList.remove('active');
    })
    
    slider.addEventListener('mouseup',() => {
        isMouseDown = false;
        slider.classList.remove('active');
    })
    
    slider.addEventListener('mousemove',(e) => {
        if(!isMouseDown) return;
    
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x-startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
    })
}

