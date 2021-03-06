const find = document.getElementById('find_idpw');


//아이디 찾기
function findidFunc() {
    document.getElementById('input2').style.display = "flex";
    document.getElementById('input3').style.display = "none";
    document.getElementById('find_pw').addEventListener('click',findpwFunc);
}

//비밀번호 찾기
function findpwFunc() {
    document.getElementById('input2').style.display = "none";
    document.getElementById('input3').style.display = "flex";
    document.getElementById('find_id_on').addEventListener('click',findidFunc);
}

//아이디, 비밀번호 찾기
function findFunc() {
    document.querySelector('.explain_text').innerHTML = '아이디/비밀번호 찾기';
    document.getElementById('input_box').style.display = "none";
    document.getElementById('input2').style.display = "flex";
    document.getElementById('find_pw').addEventListener('click',findpwFunc);
}


find.addEventListener('click',findFunc);