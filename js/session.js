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