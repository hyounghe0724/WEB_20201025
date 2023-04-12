const search_btn = document.getElementById("search_btn");
const search_str = document.querySelector("#search_txt");
const wordFilltering = ["시발", '병신', "개새끼", ""];
/*
function search_message(){
	alert("검색을 수행합니다!");
}
*/

const search_message = () =>{
	if(wordFilltering.includes(search_str.value)){     
		alert("이 단어는 검색 할 수 없습니다");

	}else{
		alert("검색을 수행합니다!");
		let search_str = document.querySelector("#search_txt"); // 변수에 저장
		document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
		let text = document.getElementById("search_message").innerHTML = search_str.value;
       	document.querySelector("#form_main").submit();
		
	}
}

search_btn.addEventListener("click" , search_message);
