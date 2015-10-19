$(function(){

	var no1 = new LeeScroll({createNum:60,bCreateAdd:true});
	no1.scrollEndFn(function(sss){
	console.log('结束')	
	});
	no1.scrollIngFn(function(iNow,iNowAll){
		console.log(iNow +"+"+iNowAll);
	});
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});

