let login_count = getCookie("loginCount");
let logout_count = getCookie("logoutCount");
function login(){
	let form = document.querySelector("#form_main");
	let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");
	let check = document.querySelector("#idSaveCheck");
	const idRegex = /^[a-z]{1,12}[0-9]*$/;
	const passRegex = /^[a-z]{1,12}[0-9][!@#$%^&*()]$/;
	form.action = "../index_login.html";
	form.method = "get";
	if(check.checked == true) { // 아이디 체크 o
            alert("쿠키를 저장합니다.");
            setCookie("id", id.value, 1); // 1일 저장
			loginCount(login_count);
            alert("쿠키 값 :" + id.value);
        } 
    else { // 아이디 체크 x
            setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }

	
	if(idRegex.test(id) || passRegex.test(password)){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }else{
		session_set();
        form.submit();
    }

}
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
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
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
function session_del() {//세션 삭제
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}
function session_set() { //세션 저장
    let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword")
    if (sessionStorage) {
		let en_text = encyrpt_text(password.value);
        sessionStorage.setItem("Session_Storage_test", en_text);

    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() { //세션 읽기
    if (sessionStorage) {
       return sessionStorage.getItem("Session_Storage_test");
    } else {
        alert("세션 스토리지 지원 x");
    }
}
function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='../index_login.html'; // 로그인된 페이지로 이동
    }
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

function encodeByAES256(key,data){
	const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
		iv: CryptoJS.enc.Utf8.parse(""),
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
		
	});
	return cipher.toString();
}

function decodeByAES256(key,data){
	const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
		iv:CryptoJS.enc.Utl8.parse(""),
		padding:CryptoJs.pad.pkcs7,
		mode: CryptoJs.mode.CBC
	});
	return cipher.toString(CryptoJs.enc.Utl8);
}

function encyrpt_text(password){
	const k = "key";
	const rk = k.padEnd(32, "");
	const b = password;
	const eb = this.encodeByAES256(rk, b);
	return  eb;
	console.log(eb);
}

function decrypt_text(){
	const  k = "key";
	const rk = k.padEnd(32, "");
	const eb = session_get();
	const b = this.decodeByAES256(rk, eb);
	console.log(b);
}