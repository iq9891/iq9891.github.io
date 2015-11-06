$(function(){
	loctionFn();
});

//倒计时跳转
function loctionFn(){
	var iNum = 5,
		$sSec = $(".sSec"),
		oTim = setInterval(function(){
			if(iNum<1){
				window.location.href = "MyLogIn.html";
			}else{
				$sSec.html(--iNum);
			}
		},1000);
};