define(function(require, exports, module) { 
	
    function init(iNow,iAll){
		
		var num = 0,n = 0,oImages = [];

		for (i=1,len=iAll;i<len;i++){
			(function(i){
				oImages[i]=new Image()
				oImages[i].onload=function(){
					n++;
					num=parseInt((n/len*100).toFixed(2));
					if(n>=len){
						console.log(num);
					}
				};
				oImages[i].src = "./images/page"+ iNow +"/motion_00"+ i +".jpg";
			})(i);
		}
		
		return oImages;

    }  
  
    exports.init = init;  
      
});