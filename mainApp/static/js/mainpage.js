// Selectors
const chatButton = document.querySelector('.btn_chat');
const chatArea = document.querySelector('.chatArea');
const chatClose = document.querySelector('.chatClose');
const writePostButton = document.querySelector('#writepostBtn');
const writePostPage = document.querySelector('.writePost');
const postChart = document.querySelectorAll('.post');
const profile = document.querySelector('fa-user');

// Eventlistener
chatButton.addEventListener('click', openChat);
chatClose.addEventListener('click', closeChat);
writePostButton.addEventListener('click', writePost);
profile.addEventListener('click', clickProfile);

// Function
// 채팅방 열기
function openChat(){
    chatArea.style.display = "flex";
    chatButton.style.display = "none";
}

// 채팅방 닫기
function closeChat(){
    chatArea.style.display = "none";
    chatButton.style.display = "block";
}

// 게시물 작성
function writePost(){
    var i=0;
    if(writePostButton.value === "게시물 작성"){
        for(i=0; i<postChart.length; i++){
            postChart[i].style.display="none";
        }
        writePostButton.value = "홈으로 이동"
        writePostPage.style.display = "unset"
    }else{
        for(i=0; i<postChart.length; i++){
            postChart[i].style.display="unset";
        }
        writePostButton.value = "게시물 작성"
        writePostPage.style.display = "none"
    }
}

// 개인 프로필 이동
function clickProfile(){
    
}