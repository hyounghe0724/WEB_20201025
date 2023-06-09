function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('./js/security.js'); // 암복호화 함수s

class SignUp {
  constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdayDate = birthdayDate;
    this.gender = gender;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.classNumber = classNumber;
    this.random = random;
	this.passsword = password;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(fullName) {
    const [firstName, lastName] = fullName.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get contactInfo() {
    return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
  }

  set contactInfo(contactInfo) {
    const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.random = random;
      
  }
}

function join(){ // 회원가입
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName");
    let l_name = document.querySelector("#lastName");
    let b_day = document.querySelector("#birthdayDate");
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress");
    let p_number = document.querySelector("#phoneNumber");    
	let password = document.querySelector("#ps");

    let class_check = document.querySelector(".select form-control-lg");

	const idRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	const passRegex = /^[a-z]{1,12}[0-9][!@#$%^&*()]$/;
	
    form.action = "../index_join.html";
    form.method = "get";
	// if(idRegex.test(email) == true && passRegex.test(password) == true){
		
	// }
	// else{
	// 	alert("tlqkf")
	// }
	if(password === 0||f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
        alert("회원가입 폼에 모든 정보를 입력해주세요.(성별, 분반 제외)");
		return;
    	}
	const keys = Object.keys(window.localStorage);
	if(keys.includes(email)){
		alert("이미 같은 아이디가 존재 합니다");
		return;
	}
	password = encyrpt_text(JSON.stringify(password));
	window.localStorage.setItem(email, password);
	session_join_set();
	form.submit();
		// if(password === 0||f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
		// alert("회원가입 폼에 모든 정보를 입력해주세요.(성별, 분반 제외)");
		// }else{
		// session_join_set();
		// form.submit();
		// }
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