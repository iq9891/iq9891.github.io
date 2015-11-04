var aImg = ['images/showImg_1.jpg',
			'images/showImg_2.jpg',
			'images/showImg_3.jpg',
			'images/showImg_4.jpg',
			'images/showImg_5.jpg',
			'images/showImg_6.jpg',
			'images/showImg_7.jpg',
			'images/showImg_8.jpg',
			'images/showImg_9.jpg',
			'images/showImg_10.jpg',
			'images/showImg_11.jpg',
			'images/showImg_12.jpg',
			'images/showImg_13.jpg',
			'images/showImg_14.jpg',
			'images/showImg_15.jpg',
			' images/showImg_16.jpg',
			'images/showImg_17.jpg',
			'images/showImg_18.jpg'];

$(jq360);

function jq360(){
	var c_i = 1;
	var iAllNum = aImg.length;
	var c1=new Array();

	for(var i=1;i<=iAllNum;i++){
		c1[i]=new Image();
		c1[i].src= aImg[i-1];
	}

	var $main_swipe = $("#phone"),
		$s360Bot = $(".s360Bot");

	var defaults = {x: 10,y: 30};
	var originalCoord = { x: 0, y: 0 };
	var shiftCoord = { x: 0, y: 0 };
	var finalCoord = { x: 0, y: 0 };

	var showPicLeft = function(){
		c_i--;
		if(c_i < 1){
			c_i = iAllNum;
		};
		$main_swipe.attr({src: c1[c_i].src});
	};

	var showPicRight = function(){
		c_i++;
		if(c_i > iAllNum){
			 c_i = 1;
		};
		$main_swipe.attr({src: c1[c_i].src});
	};
		
	$main_swipe.bind({
		"touchstart": function(ev) {
			originalCoord.x = event.targetTouches[0].pageX;
			originalCoord.y = event.targetTouches[0].pageY;
			shiftCoord.x = event.targetTouches[0].pageX;
			shiftCoord.y = event.targetTouches[0].pageY;
			finalCoord.x = originalCoord.x;
			finalCoord.y = originalCoord.y;
			$s360Bot.hide();
		},
		"touchmove": function(ev) {
		
			event.preventDefault();
			finalCoord.x = event.targetTouches[0].pageX;
			finalCoord.y = event.targetTouches[0].pageY;
			
			if(finalCoord.x - shiftCoord.x > 5){
				showPicLeft();
				shiftCoord.x = finalCoord.x;
			}else if(finalCoord.x - shiftCoord.x < -5){
				showPicRight();
				shiftCoord.x = finalCoord.x;
		   }
		},
		"touchend": function(ev) {
		
			var changeY = originalCoord.y - finalCoord.y;
			
			if(changeY < defaults.y && changeY > (defaults.y*-1)) {
				
				changeX = originalCoord.x - finalCoord.x;
				
				if(changeX > defaults.x) {
					showPicRight();
				}
				
				if(changeX < (defaults*-1)) {
					showPicLeft();
				}
			}
			
			$s360Bot.show();

		}
	});

};