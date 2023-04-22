var close_time; //시간정보
var close_time2 = 10;//10초설정

clearTimeout(close_time); // 재호출 정지
close_time = setTimeout("close_window()", 10000);
const show_time = () => {
	let divClock = document.querySelector("#Time");
	divClock.innerText = "남은 시간은 "+ close_time2 + " 초 입니다.";
	close_time2--;
	setTimeout(show_time, 1000);
}
show_time();

// const show_time = () => {
// 	let divClock = document.querySelector("#Time");
// 	divClock.innerText = close_time2;
// 	close_time2--;
// 	setTimeout(show_time, 1000);
// }


const close_window = () => {
	window.close();
}