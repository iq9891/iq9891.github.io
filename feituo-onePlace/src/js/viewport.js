var standardDpi,dpi,w,scale;
w = window.screen.width;
var contentWidth = 640;
var minScale = 0.25;
var maxScale = 4.0;
var userScale = 0;
		
if(window.screen.width>0 && /android/.test(navigator.userAgent.toLowerCase())){///android\s/.test(navigator.userAgent.toLowerCase())
	
	if(w>0){
	    if(w < 320){
	        standardDpi = 120;
	    }else if(w < 480){
	        standardDpi = 160;
	    }else if(w < 640){
	        standardDpi = 240;
	    }else if(w < 960){
	        standardDpi = 320;

	    }else if(w < 1280){
	        standardDpi = 480;
	    }else{
	        standardDpi = 640;
	    }
	}
	
	dpi = contentWidth*standardDpi/w;
	dpi = Math.floor(dpi);
	scale = w/contentWidth;
	
	if(/chrome/.test(navigator.userAgent.toLowerCase()) && !/micromessenger/.test(navigator.userAgent.toLowerCase()) && !/browser/.test(navigator.userAgent.toLowerCase()))
	{
		
		if(!document.querySelector("meta[name=viewport]"))
		{
			viewport = document.createElement('meta');
			viewport.setAttribute('name','viewport');
			viewport.setAttribute('content','width='+contentWidth+',initial-scale='+scale+', maximum-scale='+maxScale+', minimum-scale='+minScale+', user-scalable='+userScale);
			document.getElementsByTagName('head')[0].appendChild(viewport);
		}else{
			document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',initial-scale='+scale+', maximum-scale='+maxScale+', minimum-scale='+minScale+', user-scalable='+userScale);
		}
	}else{
		if(!document.querySelector("meta[name=viewport]"))
		{
			viewport = document.createElement('meta');
			viewport.setAttribute('name','viewport');
			viewport.setAttribute('content','width='+contentWidth+',initial-scale=1.0, maximum-scale='+maxScale+', minimum-scale='+minScale+',target-densitydpi='+dpi+', user-scalable='+userScale);
			document.getElementsByTagName('head')[0].appendChild(viewport);
		}else{
			document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',initial-scale=1.0, maximum-scale='+maxScale+', minimum-scale='+minScale+',target-densitydpi='+dpi+', user-scalable='+userScale);
		}
	}
	
	function orientationChange()
	{
		setTimeout(function(){
		
			w = window.screen.width;
			dpi = contentWidth*standardDpi/w;
			dpi = Math.floor(dpi);
			scale = w/contentWidth;
			if(/chrome/.test(navigator.userAgent.toLowerCase()) && !/micromessenger/.test(navigator.userAgent.toLowerCase()))
			{
				if(!document.querySelector("meta[name=viewport]"))
				{
					viewport = document.createElement('meta');
					viewport.setAttribute('name','viewport');
					viewport.setAttribute('content','width='+contentWidth+',initial-scale='+scale+', maximum-scale='+maxScale+', minimum-scale='+minScale+', user-scalable='+userScale);
					document.getElementsByTagName('head')[0].appendChild(viewport);
				}else{
					document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',initial-scale='+scale+', maximum-scale='+maxScale+', minimum-scale='+minScale+', user-scalable='+userScale);
				}
			}else{
				if(!document.querySelector("meta[name=viewport]"))
				{
					viewport = document.createElement('meta');
					viewport.setAttribute('name','viewport');
					viewport.setAttribute('content','width='+contentWidth+',initial-scale=1.0, maximum-scale='+maxScale+', minimum-scale='+minScale+',target-densitydpi='+dpi+', user-scalable='+userScale);
					document.getElementsByTagName('head')[0].appendChild(viewport);
				}else{
					document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',initial-scale=1.0, maximum-scale='+maxScale+', minimum-scale='+minScale+',target-densitydpi='+dpi+', user-scalable='+userScale);
				}
			}
		
		},500);
	}
	
	window.onorientationchange = orientationChange;
}

if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/))
{
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
        document.createTextNode("@-ms-viewport{width:auto!important;height:auto!important}")
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    
    if(!document.querySelector("meta[name=MobileOptimized]"))
		{
			mobileOptimized = document.createElement('meta');
			mobileOptimized.setAttribute('name','MobileOptimized');
			mobileOptimized.setAttribute('content',contentWidth);
    	document.getElementsByTagName('head')[0].appendChild(mobileOptimized);
    	document.write('<meta name="MobileOptimized" content="640">');
    }else{
    	document.querySelector("meta[name=MobileOptimized]").setAttribute('content',contentWidth);
    }
}

if(/ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase()))
{
	if(!document.querySelector("meta[name=viewport]"))
	{
		viewport = document.createElement('meta');
		viewport.setAttribute('name','viewport');
		viewport.setAttribute('content','width='+contentWidth+',user-scalable='+userScale);
		document.getElementsByTagName('head')[0].appendChild(viewport);
	}else{
		document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',user-scalable='+userScale);
	}
	
	if(!document.querySelector("meta[name=apple-mobile-web-app-capable]"))
	{
		appleCapable = document.createElement('meta');
		appleCapable.setAttribute('name','apple-mobile-web-app-capable');
		appleCapable.setAttribute('content','yes');
		document.getElementsByTagName('head')[0].appendChild(appleCapable);
	}else{
		document.querySelector("meta[name=apple-mobile-web-app-capable]").setAttribute('content','yes');
	}
	
	if(!document.querySelector("meta[name=apple-touch-fullscreen]"))
	{
		appleTouchFullScreen = document.createElement('meta');
		appleTouchFullScreen.setAttribute('name','apple-mobile-web-app-capable');
		appleTouchFullScreen.setAttribute('content','yes');
		document.getElementsByTagName('head')[0].appendChild(appleTouchFullScreen);
	}else{
		document.querySelector("meta[name=apple-mobile-web-app-capable]").setAttribute('content','yes');
	}
}