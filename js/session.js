function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('./js/join.js'); // 암복호화 함수

function session_del() {//세션 삭제
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_object");       
		sessionStorage.removeItem("Session_Storage_encrypted");

        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}
function session_set() { //세션 저장
    let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword")
	let random = new Date();
	
	const obj = {
		id:id.value,
		otp:random
	}
	
    if (sessionStorage) {
		const objString = JSON.stringify(obj);
	
		let en_text = encyrpt_text(objString);
		sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);

    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() { //세션 읽기
    if (sessionStorage) {
		console.log(sessionStorage.getItem("Session_Storage_encrypted"));
		console.log(sessionStorage.getItem("Session_Storage_object"));
       return sessionStorage.getItem("Session_Storage_encrypted");
    } else {
        alert("세션 스토리지 지원 x");
    }
}
function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_encrypted")) {
        alert("이미 로그인 되었습니다.");
        location.href='../index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_join_set(){
	let f_name = document.querySelector("#firstName").value;
	let l_name = document.querySelector("#lastName").value;
	let b_day = document.querySelector("#birthdayDate").value;
	let gender = document.querySelector("inlineRadioOpions");
	let email = document.querySelector("#emailAddress").value;
	let p_number = document.querySelector("#phoneNumber").value;
	let class_check = document.querySelector(".select form-control-lg");
	let random = new Date();
	
	const newSignUp = new SignUp(f_name, l_name,  b_day, gender,
		email, p_number, class_check, random);
	console.log(newSignUp.FullName);
	console.log(newSignUp.contactInfo);
	
	if(sessionStorage){
		const objString = JSON.stringify(newSignUp);
		let en_text = encyrpt_text(objString);
		sessionStorage.setItem("Session_Storage_object", objString);
		sessionStorage.setItem("Session_Storage_encrypted", en_text);
	} else{
		alert("세션 스토리지 지원 x")
	}
}

function session_join_get(){
	if (sessionStorage) {
		console.log(sessionStorage.getItem("Session_Storage_object"));
       return sessionStorage.getItem("Session_Storage_encrypted");
    } else {
        alert("세션 스토리지 지원 x");
    }
}