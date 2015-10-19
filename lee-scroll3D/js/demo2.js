$(function(){

	var no0 = new LeeScroll({createNum:2,createHtml:['上午','下午']});
	var no1 = new LeeScroll({obj:'#scroll3D2',addObj:'#lsUl3,#lsUl4'});
	no1.scrollEndFn(function(sss){
		console.log('结束')	
	});
	no1.scrollIngFn(function(iNow){
		if(Math.ceil(iNow/12)%2==0){
			no0.scrollToEleFn(2);
		}else{
			no0.scrollToEleFn(1);
		}
	});
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});

