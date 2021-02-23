//Selector
const postClicks = document.querySelectorAll('.board-click');
let postLists = document.querySelectorAll('.postList');
const postCounts = document.querySelectorAll('.postCount');
const QAClick = document.querySelector('.question');
const QAIcon = document.getElementById('Q-icon');
const centerChart = document.querySelector('.centerChart');
const newBoard = document.querySelector('.newBoard');
const QAChart = document.querySelector('.QAChart');
const logoBoardIcon = document.getElementById('logo-board-icon');
const logoBoard = document.getElementById('logo-board');
const posts = document.getElementById('posts');
const addNewBoard = document.getElementById('add_btn');
let editBoards = document.querySelectorAll('.postMenu>i');

//function
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
    //Create p
    const deleteBoard = document.createElement('p');
    deleteBoard.classList.add('deleteBoard');
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
    QAChart.style.display = "none";
    newBoard.style.display = "none";
    logoBoardIcon.style.display="flex";
    logoBoard.innerHTML = postClick.querySelector('.postTitle').innerHTML;
    centerChart.style.display = "none";
    posts.style.display = 'flex'; //메인 페이지처럼 해당 게시판의 게시물들 표시
    });
}

//문의사항 게시판
function QAboardFunc(){
    for(let postList of postLists){
        postList.style.display = "none";
    }
    QAChart.style.display = "flex";
    document.querySelector('.writePost').style.display = "none";
    newBoard.style.display = "none";
    posts.style.display = 'none'
    logoBoardIcon.style.display="flex";
    logoBoard.innerHTML = document.getElementById('q2').innerHTML;
}

//문의사항 작성
function QAFunc() {
    for(let postList of postLists){
        postList.style.display = "none";
    }
    centerChart.style.display = "none";
    QAChart.style.display = "none";
    document.querySelector('.writePost').style.display = "flex";
    newBoard.style.display = "none";
    logoBoardIcon.style.display="flex";
}


//Event Listener
QAClick.addEventListener('click',QAboardFunc); //문의사항 게시판
QAIcon.addEventListener('click', QAFunc);//문의사항 작성
addNewBoard.addEventListener('click',addNewBoardFunc);//새 게시판 생성
for(let editBoard of editBoards){
    editBoard.addEventListener('click',editBoardFunc);//게시판 메뉴
}


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