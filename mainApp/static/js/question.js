// Selectorconst 
const QAIcon = document.querySelector('.Q-write');
const QAChart = document.querySelector('.QAChart');
const Qwrite = document.getElementById('write');
let count = document.querySelector('.QAChart .postChart>li>div>p');
let today = new Date();   
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일

// Function
//문의사항 게시글 추가
function newQboardFunc(){
    if(Qwrite.parentElement.parentElement.querySelector('.title>input').value === ""){
        alert('제목을 입력하세요!');
    }
    else if(Qwrite.parentElement.parentElement.querySelector('.content>textarea').value === ""){
        alert('내용을 입력하세요!');
    }
    else{
        QAboardFunc();
        //Create p
        const Qcount = document.createElement('p');
        Qcount.classList.add('Qcount');
        count = (count.innerHTML*1)+1;
        Qcount.innerHTML = count;
        count = Qcount;
        //Create p
        const postTitle = document.createElement('p');
        postTitle.classList.add('postTitle');
        postTitle.innerHTML = Qwrite.parentElement.parentElement.querySelector('.title>input').value;
        //Create p
        const newText = document.createElement('p');
        newText.innerHTML = "new";
        //Create Div
        const div1 = document.createElement('div');
        div1.appendChild(Qcount);
        div1.appendChild(postTitle);
        div1.appendChild(newText);
        //Create p
        const writeTime = document.createElement('p');
        writeTime.classList.add('writeTime');
        if(month*1 < 10 && (month.toString()).substr(0,1) !== '0'){
            month = '0'+month;
        }
        if(date*1 < 10 && (date.toString()).substr(0,1) !== '0'){
            date = '0'+date;
        }
        writeTime.innerHTML = year + "." + month + "." + date;
        //Create p
        const postCount = document.createElement('p');
        postCount.classList.add('postCount');
        postCount.innerHTML = "답변 0";
        //Create Div2
        const div2 = document.createElement('div');
        div2.appendChild(writeTime);
        div2.appendChild(postCount);
        //Create li
        const li = document.createElement('li');
        li.appendChild(div1);
        li.appendChild(div2);
        //Prepend postChart
        const QboardList = QAChart.querySelector('.postChart');
        QboardList.insertBefore(li,QboardList.firstChild);
    }
    
}

//문의사항 게시판
function QAboardFunc(){
    QAChart.style.display = "flex";
    document.querySelector('.writePost').style.display = "none";
}

//문의사항 작성
function QAFunc() {
    QAChart.style.display = "none";
    document.querySelector('.writePost').style.display = "flex";
    document.getElementById('titleId').value = "";
    document.getElementById('contentId').value = "";
    document.getElementById('passwordId').value = "";
}

// EventListener
// QAClick.addEventListener('click',QAboardFunc); //문의사항 게시판
QAIcon.addEventListener('click', QAFunc);//문의사항 작성
Qwrite.addEventListener('click', newQboardFunc);//문의사항 글쓰기버튼
