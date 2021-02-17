// Selectors
const chatButton = document.querySelector('.btn_chat');
const chatArea = document.querySelector('.chatArea');
const chatClose = document.querySelector('.chatClose');
const writePostButton = document.querySelector('.fa-edit');
const postChart = document.querySelector('.centerChart');

// Eventlistener
chatButton.addEventListener('click', openChat);
chatClose.addEventListener('click', closeChat);
writePostButton.addEventListener('click', writePost);

// Function
function openChat(){
    chatArea.style.display = "flex";
    chatButton.style.display = "none";
}

function closeChat(){
    chatArea.style.display = "none";
    chatButton.style.display = "block";
}

function writePost(){
    console.log('hey');
    postChart.style.display="none";
}