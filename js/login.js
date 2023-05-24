
function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('./js/security.js'); // 암복호화 함수
addJavascript('./js/session.js'); // 세션 함수
addJavascript('./js/cookie.js'); // 쿠키 함수


var login_count = getCookie("loginCount");
var logout_count = getCookie("logoutCount");

function setCookie(name, value, expiredays) {
        var date = new Date();
        date.setDate(date.getDate() + expiredays);
		document.cookie = escape(name) + "=" + escape(value)+ "; expires="
			+ date.toUTCString() + "SameSite=None; Secure";

    }
function getCookie(name) {
        var cookie = document.cookie;
        console.log("쿠키를 요청합니다.");
        if (cookie != "") {
            var cookie_array = cookie.split("; ");
            for ( var index in cookie_array) {
                var cookie_name = cookie_array[index].split("=");
                
                if (cookie_name[0] == name) {
                    return cookie_name[1];
                }
            }
        }
        return ;
}
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function login(){

	let form = document.querySelector("#form_main");
	let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");
	let check = document.querySelector("#idSaveCheck");
	const idRegex = /^[a-z]{1,12}[0-9]*$/;
	const passRegex = /^[a-z]{1,12}[0-9][!@#$%^&*()]$/;
	form.action = "../index_login.html";
	form.method = "get";
	
	if(check.checked === true && (idRegex.test(id) && passRegex.test(password)) &&
	  parseInt(getCookie("loginFailed")) < 3 || getCookie("loginFailed") === undefined)
	  {
		setCookie("id", id.value, 1); // 1일 저장
		loginCount(login_count);
		session_set();
		session_get();
		form.submit();
    }else if(parseInt(getCookie("loginFailed")) > 3){
		alert("4분간 로그인 할 수 없습니다");
		check.checked = false;
		setTimeout(function (){
			check.checked = true;
		}, 4 * 60 * 1000);
	}
	else{
		if(getCookie("loginFailed") === undefined){
			setCookie("loginFailed", 1, 1);
		}
		else{
			setCookie("loginFailed", parseInt(getCookie("loginFailed")) + 1 , 1);
		}
		setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
		alert("아이디와 비밀번호를 모두 입력해주세요.");
    }

}

function loginCount(login_count){
	// 구현 필
	if(getCookie("loginCount") === undefined){
		setCookie("loginCount", 1, 1);
	}else{
		login_count = parseInt(getCookie("loginCount")) + 1;
		setCookie("loginCount", login_count, 1);
	}
	
}
function logoutCount(logout_count){
	if(getCookie("logoutCount") === undefined){
		setCookie("logoutCount", 1, 1);
	}else{
		logout_count = parseInt(getCookie("logoutCount")) + 1;
		setCookie("logoutCount", logout_count, 1);
	}
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
	session_check();
}


function logout(){
	logoutCount(logout_count);
	session_del();
	location.href='../index.html';
}

const get_id = () => {
	setTimeout(logout, 5 * 60 * 1000);
	if(true){
		decrypt_text();
	}else{
		var getParameters = function(paramName){ // 변수 = 함수(이름)
		var returnValue; // 리턴값을 위한 변수 선언
		var url = location.href; // 현재 접속 중인 주소 정보 저장
		var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
		for(var i = 0; i < parameters.length; i++) { 
		var varName = parameters[i].split('=')[0]; // id=.. 를 로 나눈 리스트의 첫 번쨰 인덱스 i
		if (varName.toUpperCase() == paramName.toUpperCase()) {
			returnValue = parameters[i].split('=')[1];
			return decodeURIComponent(returnValue);
			// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
			}
		} // 2중 for문 끝
		} // 함수 끝
		alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
	}
	
}


