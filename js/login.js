function login(){
	let form = document.querySelector("#form_main");
	let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");
	const idRegex = /^[a-z]{1,12}[0-9]*$/;
	const passRegex = /^[a-z]{1,12}[0-9][!@#$%^&*()]$/;
	form.action = "../index_login.html";
	form.method = "get";
	if(idRegex.test(id) || passRegex.test(password)){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }else{
        form.submit();
    }

}

function logout(){
	location.href='../index.html';
}

const get_id = () => {
	var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0]; // id=.. 를 로 나눈 리스트의 첫 번쨰 인덱스 id
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
	}; // 함수 끝
	alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
}