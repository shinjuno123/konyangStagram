//Selector
const postClicks = document.querySelectorAll('.board-click');
const QAClick = document.querySelector('.question');
const boardClick = document.querySelector('.noticeBoard');
const centerChart = document.querySelector('.centerChart');
const postLists = document.querySelectorAll('.postList');
const QAIcon = document.getElementById('Q-icon');

//function
//해당 게시판으로 들어가기
for(let postClick of postClicks){
    postClick.addEventListener('click',function(){
        document.getElementById('logo-board-icon').style.display="flex";
        document.getElementById('logo-board').innerHTML = postClick.querySelector('.postTitle').innerHTML;
        document.getElementById('posts').style.display = 'flex'; //메인 페이지처럼 해당 게시판의 게시물들 표시
        centerChart.style.display = "none";
    });
}

//문의사항 작성
function QAFunc() {
    centerChart.style.height = "auto";
    for(let postList of postLists){
        postList.style.display = "none";
    }
    document.querySelector('.postList').style.display = "none";
    document.querySelector('.writePost').style.display = "flex";
    document.getElementById('logo-board-icon').style.display="flex";
    document.getElementById('logo-board').innerHTML = document.getElementById('q2').innerHTML;
}

//전체 게시판
function boardFunc() {
    document.querySelector('.noticeBoard>span').setAttribute('href','boardpage.html');//a태그로 변경해야함
}


//Event Listener
boardClick.addEventListener('click',boardFunc);
QAClick.addEventListener('click',QAFunc);
//QAIcon.addEventListener('click', QAFunc);




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
