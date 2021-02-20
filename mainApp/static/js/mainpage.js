// Selectors
const chatButton = document.querySelector('.btn_chat');
const chatArea = document.querySelector('.chatArea');
const chatClose = document.querySelector('.chatClose');

// Eventlistener
chatButton.addEventListener('click', openChat);
chatClose.addEventListener('click', closeChat);

// Function
function openChat(){
    chatArea.style.display = "flex";
    chatButton.style.display = "none";
}

function closeChat(){
    chatArea.style.display = "none";
    chatButton.style.display = "block";
}

