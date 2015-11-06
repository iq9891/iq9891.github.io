$(function(){
	noFn();
});

//禁止跳转
function noFn(){
	$(".mbArea").click(function(){
		alert("您还未登录");
	});
};