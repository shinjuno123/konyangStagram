//Selector
const postClick = document.querySelector('.board-click');
const QAClick = document.querySelector('.question');
const boardClick = document.querySelector('.noticeBoard');
const centerChartAll = document.querySelectorAll('.centerChart');
const QAIcon = document.getElementById('Q-icon');

//function
//게시판 클릭시 로고 옆 게시판 이름 생성
function postclickFunc() {
    document.getElementById('logo-board-icon').style.display="flex";
    document.getElementById('logo-board').innerHTML = postClick.querySelector('.postTitle').innerHTML;
    document.getElementById('posts').style.display = 'flex'; //메인 페이지처럼 해당 게시판의 게시물들 스크롤
    //centerChartAll[0].setAttribute('style','background-color: rgb(248, 248, 248)');
    centerChartAll[0].style.display = "none";
    centerChartAll[1].style.display = "none";
    centerChartAll[2].style.display = "none";
}

//문의사항 작성
function QAFunc() {
    centerChartAll[0].style.height = "auto";
    document.querySelector('.postList').style.display = "none";
    document.querySelector('.writePost').style.display = "flex";
    centerChartAll[1].style.display = "none";
    //centerChartAll[2].style.display = "none";
    document.getElementById('logo-board-icon').style.display="flex";
    document.getElementById('logo-board').innerHTML = document.getElementById('q2').innerHTML;
}

//전체 게시판
function boardFunc() {
    document.querySelector('.noticeBoard>span').setAttribute('href','postpage.html');//a태그로 변경해야함
}


//Event Listener
boardClick.addEventListener('click',boardFunc);
QAClick.addEventListener('click',QAFunc);
//QAIcon.addEventListener('click', QAFunc);
postClick.addEventListener('click',postclickFunc);
