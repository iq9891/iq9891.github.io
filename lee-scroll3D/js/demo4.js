$(function(){

	var sMoment = '上午',
		iHour = 1,
		iMin = 1;
	
	var no1 = new LeeScroll({obj:'#scroll3D1',addObj:'#lsUl1,#lsUl2',createNum:2,iLeft:30,createHtml:['上午','下午']});

	var no2 = new LeeScroll({obj:'#scroll3D2',addObj:'#lsUl3,#lsUl4',iLeft:30});
	no2.scrollEndFn(function(iNow){
		iHour = iNow;
	});
	no2.scrollIngFn(function(iNow,iNowAll){
		if(Math.ceil(iNowAll/12)%2==0){
			no1.scrollToEleFn(2);
			sMoment = '上午';
		}else{
			no1.scrollToEleFn(1);
			sMoment = '下午';
		}
	});

	var no3 = new LeeScroll({obj:'#scroll3D3',addObj:'#lsUl5,#lsUl6',createNum:60,iLeft:30,bCreateAdd:true});
	no3.scrollEndFn(function(iNow){
		iMin = iNow;
	});
	
	//显示时间
	$('#showTime').on('touchend',function(){
		$('#time').html('您选的时间为：'+sMoment+iHour+":"+iMin);
	});
	
	//阻止默认事件
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});

