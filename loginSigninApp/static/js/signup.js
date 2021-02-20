const certification = document.getElementById('certification');

//회원가입(정보입력)
function signupFunc() {
    document.querySelector('.explain_text').innerHTML = '회원가입';
    document.getElementById('cfForm').style.display = "none";
    document.getElementById('signupForm').style.display = "flex";
}


//본인인증(인증번호)
certification.addEventListener('click',function(event){
    event.preventDefault();
    document.getElementById('certification').style.display = "none";
    document.getElementById('cf_box').style.display = "flex";

    document.getElementById('cf_btn').addEventListener('click',function(){
        document.getElementById('cf_box').setAttribute('id','cf_success');
        document.getElementById('cf_success').innerHTML = '인증완료';
        document.getElementById('next').setAttribute('id','next_on');
        document.getElementById('next_on').innerHTML = '다음';

        document.getElementById('next_on').addEventListener('click',signupFunc);

    })
})


//회원가입 후 로그인 html로 연결
function signinHTML(){
    
}

document.getElementsById('signup_btn').addEventListener('click',signinHTML);