define(function(require, exports, module) { 
	
	var fOne = require('../module/oneIn');

	var aImgA = require('../module/imgLoad').init(0),
		aImgB,aImgC,
		//��������ͼ��length��������1��ͼƬ���Ǿ���2
		//ͼƬ·����images��
		aImgNum = [2,2];  
	
    function init(){
		
		var bCanMove = true,
			iNow = 0,
			$scroll = $(".scroll"),
			$scrollArea = $(".scrollArea"),
			$doc = $(document),
			iTop = $scrollArea.height(),
			iLen = $scrollArea.length,
			sEnd = 'webkitTransitionEnd';
		
		$doc.swipeUp(function(e){
			if(iNow == iLen-1 || !bCanMove){return;}
			bCanMove = false;
			$scroll.css({ marginTop: -iTop * ++iNow +'px' });
			$doc.on('webkitTransitionEnd', upEndFn);
		}).swipeDown(function(e){
			if(iNow == 0 || !bCanMove){return;}
			bCanMove = false;
			$scroll.css({ marginTop: -iTop * --iNow +'px' });
			$doc.on('webkitTransitionEnd', downEndFn);
		});
		
		function upEndFn(){
			console.log(iNow);
			bCanMove = true;
			aImgB = require('../module/imgLoad').init(iNow - 1,aImgNum[iNow - 1]);
			$doc.off('webkitTransitionEnd', upEndFn);
		}
		function downEndFn(){
			console.log(iNow);
			bCanMove = true;
			$doc.off('webkitTransitionEnd', downEndFn);
		}
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    }  
  
    exports.init = init;  
      
});