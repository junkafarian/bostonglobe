/*!
 * Responsive Images
 * Mobile-First images that scale responsively and responsibly
 * Copyright 2010, Scott Jehl, Filament Group, Inc
 * MIT License
 * Check out the README.md file for instructions and optimizations
*/
(function(win){
	//defaults / mixins
	var	rwdi = (function(){
			var defaults = {
				// this option assumes data- attributes aren't in use
				// set to false if you need them (see README.md)
				immediateRedirect:	true,
				//default width for small/large images
				widthBreakPoint:	480,
				cookieName: 		"rwdimgsize",
				cookiePath: 		"/" 
				
				/* The path above is set to "/" For the sake of testing on the development subdomain. When the site is moved to the bostonglobe.com primary domain, the line above will need to be changed to the following: */
				//cookiePath: 		".bostonglobe.com"

			};
			//mixins from rwd_images global
			if( win.rwd_images ){
				for (var setting in win.rwd_images) {
			        defaults[setting] = win.rwd_images[setting];
			    }
			}
			return defaults;
		})(),		
		widthBreakPoint = rwdi.widthBreakPoint,
		wideload = win.screen.availWidth > widthBreakPoint && location.search.indexOf("mobile-assets") <= 0,
		doc = win.document,
		
		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
		    date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
		    doc.cookie = rwdi.cookieName + "=" + ( wideload ? "large" : "small" ) + "; expires=" + date.toGMTString() + "; path=" + rwdi.cookiePath;
		})();

		//if wideload is false quit now
		if( !wideload ){
			return;
		}
		
		//find and replace img elements
		var findrepsrc = function(){
			var imgs = doc.getElementsByTagName('img'),
				il = imgs.length;
				
			for(var i = 0; i < il; i++){
				var img = imgs[i],
					fullsrc = img.getAttribute('data-fullsrc');
					
				if(fullsrc){
					img.src = fullsrc;
				}
			}
		},
			    
	    //flag for whether loop has run already
	    complete = false,
	    
	    //rfind/rep image srcs if wide enough (maybe make this happen at domready?)
	    readyCallback = function(){
	    	if( complete ){ return; }
	    	complete = true;
	    	findrepsrc();
	    },
	
		unsetCookie = function(){
			document.cookie = rwdi.cookieName + "=; expires=" + (new Date()).toGMTString() + "; path=" + rwdi.cookiePath;
		};
		
	//DOM-ready or onload handler
	//W3C event model
	if ( doc.addEventListener ) {
		doc.addEventListener( "DOMContentLoaded", readyCallback, false );
		//fallback
		win.addEventListener( "load", function(){
			readyCallback();
			unsetCookie();
		}, false );
		
	}
	// If IE event model is used
	else if ( doc.attachEvent ) {
		doc.attachEvent("onreadystatechange", readyCallback );
		//fallback
		win.attachEvent( "onload", function(){
			readyCallback();
			unsetCookie();
		} );
	}
})(this);

/*! Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
(function(e,h){e.respond={};respond.update=function(){};respond.mediaQueriesSupported=h;if(h){return}var u=e.document,r=u.documentElement,i=[],k=[],p=[],o={},g=30,f=u.getElementsByTagName("head")[0]||r,b=f.getElementsByTagName("link"),d=[],a=function(){var B=b,w=B.length,z=0,y,x,A,v;for(;z<w;z++){y=B[z],x=y.href,A=y.media,v=y.rel&&y.rel.toLowerCase()==="stylesheet";if(!!x&&v&&!o[x]){if(!/^([a-zA-Z]+?:(\/\/)?(www\.)?)/.test(x)||x.replace(RegExp.$1,"").split("/")[0]===e.location.host){d.push({href:x,media:A})}else{o[x]=true}}}t()},t=function(){if(d.length){var v=d.shift();n(v.href,function(w){m(w,v.href,v.media);o[v.href]=true;t()})}},m=function(G,v,x){var E=G.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),H=E&&E.length||0,v=v.substring(0,v.lastIndexOf("/")),w=function(I){return I.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+v+"$2$3")},y=!H&&x,B=0,A,C,D,z,F;if(v.length){v+="/"}if(y){H=1}for(;B<H;B++){A=0;if(y){C=x;k.push(w(G))}else{C=E[B].match(/@media ([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;k.push(RegExp.$2&&w(RegExp.$2))}z=C.split(",");F=z.length;for(;A<F;A++){D=z[A];i.push({media:D.match(/(only\s+)?([a-zA-Z]+)(\sand)?/)&&RegExp.$2,rules:k.length-1,minw:D.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1),maxw:D.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1)})}}j()},l,q,j=function(E){var v="clientWidth",x=r[v],D=u.compatMode==="CSS1Compat"&&x||u.body[v]||x,z={},C=u.createDocumentFragment(),B=b[b.length-1],w=(new Date()).getTime();if(E&&l&&w-l<g){clearTimeout(q);q=setTimeout(j,g);return}else{l=w}for(var y in i){var F=i[y];if(!F.minw&&!F.maxw||(!F.minw||F.minw&&D>=F.minw)&&(!F.maxw||F.maxw&&D<=F.maxw)){if(!z[F.media]){z[F.media]=[]}z[F.media].push(k[F.rules])}}for(var y in p){if(p[y]&&p[y].parentNode===f){f.removeChild(p[y])}}for(var y in z){var G=u.createElement("style"),A=z[y].join("\n");G.type="text/css";G.media=y;if(G.styleSheet){G.styleSheet.cssText=A}else{G.appendChild(u.createTextNode(A))}C.appendChild(G);p.push(G)}f.insertBefore(C,B.nextSibling)},n=function(v,x){var w=c();if(!w){return}w.open("GET",v,true);w.onreadystatechange=function(){if(w.readyState!=4||w.status!=200&&w.status!=304){return}x(w.responseText)};if(w.readyState==4){return}w.send()},c=(function(){var v=false,w=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest()}],y=w.length;while(y--){try{v=w[y]()}catch(x){continue}break}return function(){return v}})();a();respond.update=a;function s(){j(true)}if(e.addEventListener){e.addEventListener("resize",s,false)}else{if(e.attachEvent){e.attachEvent("onresize",s)}}})(this,(function(f){if(f.matchMedia){return true}var e,i=document,c=i.documentElement,g=c.firstElementChild||c.firstChild,h=!i.body,d=i.body||i.createElement("body"),b=i.createElement("div"),a="only all";b.id="mq-test-1";b.style.cssText="position:absolute;top:-99em";d.appendChild(b);b.innerHTML='_<style media="'+a+'"> #mq-test-1 { width: 9px; }</style>';if(h){c.insertBefore(d,g)}b.removeChild(b.firstChild);e=b.offsetWidth==9;if(h){c.removeChild(d)}else{d.removeChild(b)}return e})(this));

/* Modernizr custom build of 1.7: applicationcache | localstorage | touch | iepp | innerShiv */

/* disable IEPP - the site is not printing well in IE, and this helps */
window.iepp = { disablePP: true };

/* Modernizr */
;window.Modernizr=function(a,b,c){function G(){}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.touch=function(){return"ontouchstart"in a||w("@media ("+o.join("touch-enabled),(")+"modernizr)")},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.applicationcache=function(){return!!a.applicationCache};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,f&&a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function p(a,b){var c=-1,d=a.length,e,f=[];while(++c<d)e=a[c],(b=e.media||b)!="screen"&&f.push(p(e.imports,b),e.cssText);return f.join("")}function o(a){var b=-1;while(++b<e)a.createElement(d[b])}var c="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",d=c.split("|"),e=d.length,f=new RegExp("(^|\\s)("+c+")","gi"),g=new RegExp("<(/*)("+c+")","gi"),h=new RegExp("(^|[^\\n]*?\\s)("+c+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),i=b.createDocumentFragment(),j=b.documentElement,k=j.firstChild,l=b.createElement("body"),m=b.createElement("style"),n;o(b),o(i),k.insertBefore(m,k.firstChild),m.media="print",a.attachEvent("onbeforeprint",function(){var a=-1,c=p(b.styleSheets,"all"),k=[],o;n=n||b.body;while((o=h.exec(c))!=null)k.push((o[1]+o[2]+o[3]).replace(f,"$1.iepp_$2")+o[4]);m.styleSheet.cssText=k.join("\n");while(++a<e){var q=b.getElementsByTagName(d[a]),r=q.length,s=-1;while(++s<r)q[s].className.indexOf("iepp_")<0&&(q[s].className+=" iepp_"+d[a])}i.appendChild(n),j.appendChild(l),l.className=n.className,l.innerHTML=n.innerHTML.replace(g,"<$1font")}),a.attachEvent("onafterprint",function(){l.innerHTML="",j.removeChild(l),j.appendChild(n),m.styleSheet.cssText=""})}(a,b),e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document);

document.documentElement.className = document.documentElement.className.replace( "applicationcache", "");

/* innerShiv Plugin for appending HTML5 elements */
window.innerShiv=(function(){var lteIE8 = document.documentElement.className.match( /ie6|ie7|ie8/ ),d,r;return function(h,u){if(!lteIE8){return h}if(!d){d=document.createElement("div");r=document.createDocumentFragment();d.style.display="none";d.style.display="none"}var e=d.cloneNode(true);document.body.appendChild(e);e.innerHTML=h.replace(/^\s\s*/,"").replace(/\s\s*$/,"");document.body.removeChild(e);if(u===false){return e.childNodes}var f=r.cloneNode(true),i=e.childNodes.length;while(i--){f.appendChild(e.firstChild)}return f}}());

// display: table and table-cell test. (both are tested under one name "table-cell" )
// By @scottjehl
Modernizr.addTest( "display-table",function(){
  
  var doc   = window.document,
      docElem = doc.documentElement,   
      parent  = doc.createElement( "div" ),
      child = doc.createElement( "div" ),
      childb  = doc.createElement( "div" ),
      ret;
  
  parent.style.cssText = "display: table";
  child.style.cssText = childb.style.cssText = "display: table-cell; padding: 10px";    
          
  parent.appendChild( child );
  parent.appendChild( childb );
  docElem.insertBefore( parent, docElem.firstChild );
  
  ret = child.offsetLeft < childb.offsetLeft;
  docElem.removeChild(parent);
  return ret; 
});

//some quick support flags for enhanced scripting/styles
(function(win, undefined){
	//define some globals
	var doc 		= win.document,
		docElem 	= doc.documentElement,
		head		= doc.head || doc.getElementsByTagName( "head" )[0] || docElem,
		Modernizr	= win.Modernizr;

	//define "globe" global namespace
	globe = {};
	
	// mixins - utility object extender
	globe.extend = function( obj, props ){
		for (var i in props ) {
	        obj[i] = props[i];
	    }
	    return globe;
	};
	
	//support hash
	globe.extend( globe, {
		browser	: {},
		dev		: {},
		support	: {}
	});
	
	//define a few browsers (from conditional comments)
	var docElem = win.document.documentElement;
	globe.browser.ie6 = docElem.className.indexOf( "ie6" ) >= 0;
	globe.browser.ie7 = docElem.className.indexOf( "ie7" ) >= 0;
	globe.browser.ie8 = docElem.className.indexOf( "ie8" ) >= 0;	
	
	//dev mobile assets flag: use for previewing mobile-optimized assets
	globe.dev.mobileOverride = location.search.indexOf("mobile-assets") >= 0;
	
	//callback for body-dependent scripts
	globe.bodyready = (function(){
		var callbackStack 	= [],
			checkRun		= function( callback ){
			
				if( callback ){
					callbackStack.push( callback );
				}
				
				if( doc.body ){
					while( callbackStack[0] && typeof( callbackStack[0] ) === "function" ){
						callbackStack.shift().call( win );
					}
				}
				else{
					setTimeout(checkRun, 15); 
				}
			};
			return checkRun;
	})();
	
	/* Asset loading functions:
		- globe.load is a simple script or stylesheet loader
		- scripts can be loaded via the globe.load.script() function
		- Styles can be loaded via the globe.load.style() function, 
		  which accepts an href and an optional media attribute
	*/

	//loading functions available on globe.load
	globe.load = {};

	//define globe.load.style
	globe.load.style = function( href, media ){
		if( !href ){ return; }
		var lk			= doc.createElement( "link" ),
			links		= head.getElementsByTagName("link"),
			lastlink	= links[links.length-1];
			lk.type 	= "text/css";
			lk.href 	= href;
			lk.rel		= "stylesheet";
			if( media ){
				lk.media = media;
			}
			
			//if respond.js is present, be sure to update its media queries cache once this stylesheet loads
			//IE should have no problems with the load event on links, unlike other browsers
			if( "respond" in window ){
				lk.onload = respond.update;
			}
			
			//might need to wait until DOMReady in IE...
			if( lastlink.nextSibling ){
				head.insertBefore(lk, lastlink.nextSibling );
			} else {
				head.appendChild( lk );
			}
	};
	
	//define globe.load.style
	globe.load.script = function( src ){
		if( !src ){ return; }
		var script		= doc.createElement( "script" ),
			fc			= head.firstChild;
			script.src 	= src;

			//might need to wait until DOMReady in IE...
			if( fc ){
				head.insertBefore(script, fc );
			} else {
				head.appendChild( script );
			}
	};
	
	//quick element class existence function
	globe.hasClass = function( el, classname ){
		return el.className.indexOf( classname ) >= 0;
	};
	
	//cookie functions - set,get,forget
	globe.cookie = {
		set: function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		forget: function(name) {
			createCookie(name, "", -1);
		}
	};
	
	//extend globe.support with some modernizr definitions
	globe.extend( globe.support, {
		localStorage		: Modernizr.localstorage,
		applicationcache	: Modernizr.applicationcache,
		touch				: Modernizr.touch,
		displayTable		: Modernizr[ "display-table" ]
	});
	

	
})(this);


/*
Boston Globe JS asset controller
*/
(function(win, undefined){

	//define some globals
	var doc 		= win.document,
		docElem 	= doc.documentElement,
		head		= doc.head || doc.getElementsByTagName( "head" )[0] || docElem,
		globe		= win.globe;

	//native media-query supporting browsers (and IE6+) are "enhanced"
	globe.enhanced 	= (respond.mediaQueriesSupported || globe.browser.ie6 || globe.browser.ie7 || globe.browser.ie8) && !(win.blackberry && !win.WebKitPoint);

	//non-mq-supporting browsers, exit here
	if( !globe.enhanced ){ 
		return;
	}

	//From here on -> enhanced experience
	docElem.className += " enhanced enhanced-rendering";	

	//remove the basic stylesheet
	var basicCSS = doc.getElementById( "basic-css" );
	if( basicCSS ){
		head.removeChild( basicCSS );
	}
	
	//add class to html element for homescreen mode
	if ( win.navigator.standalone ) {
		docElem.className += " standalone";	
	}

	//define file loading paths
	globe.config = {
		path: {
			"js"	: "/js/",
			"css"	: "/css/",
			"img"	: "_img/"
		}
	};
	
	globe.helpers = {};
	
	
	//define advertising urls, defaults
	globe.OAS = {
		//ad server url
		url : "http://rmedia.boston.com/RealMedia/ads/adstream_sx.ads/"
		//default sitepage
		,sitepage : "www.bostonglobe.com/news/traffic"
	}

	//define scripts and style assets for conditional loading
	globe.assets = {
		js: {
			jQuery				: "lib/jquery.js",
			uiCore				: "lib/jquery-ui-core.min.js",
			touch				: "lib/jquery.touch.js",
			resize				: "lib/jquery.throttledresize.js",
			ajaxInc				: "lib/jquery-ajax-include.js",
			uiWidget			: "lib/jquery-ui-widget.min.js",
			uiMouse				: "lib/jquery-ui-mouse.min.js",
			uiResizable			: "lib/jquery-ui-resizable.min.js",
			transfer			: "lib/jquery.transfer.js",
			uiDatepicker		: "lib/jquery-ui-datepicker.min.js",
			delayedEnter		: "lib/jquery.delayedenter.min.js",
			collapsible			: "lib/jquery.collapsible.js",
			carousel			: "lib/jquery.carousel.js",
			stickyScroll		: "lib/jquery.stickyscroll.js",
			json2				: "lib/json2.js",
			
			//globe-specific
			common				: "globe-common.js",
			masthead			: "globe-masthead.js",
			article				: "globe-article.js,globe-share-tools.js",
			comments            : "globe-comments.js,lib/PluckSDKProxy.js", 
			gallery				: "globe-gallery.js,lib/jquery.mobile-1.0b2pre.min.js,lib/jquery.mobile.pagination.js,globe-share-tools.js",
			magazine			: "globe-magazine.js",
			special				: "globe-special.js",
			saved				: "globe-saved.js",
			savedStorage		: "globe-saved-storage.js",
			savedApp			: "globe-saved-app.js",
			savedDrawer         : "globe-saved-drawer.js",
			todaysPaper			: "globe-todays-paper.js",
			adCatalog			: "globe-adcatalog.js",
			adInclude			: "globe-adinclude.js",
			crossword           : "globe-crossword.js",
			contentInclude		: "globe-contentinclude.js",
			staff				: "globe-staff.js",
			statusmsg			: "globe-statusmsg.js",
			memberCenter		: "globe-membercenter.js",
			serp				: "globe-serp.js",
			regi				: "globe-regi.js", 
			videoplayer			: "globe-videoplayer.js"
			
		},
		css: {
			fonts 				: "globe-fonts.css",
			savedDrawer			: "globe-saved-drawer.css",
			uiDatepicker		: "lib-ui-datepicker.css"
		},
		//these are auto-preloaded
		img: [
			globe.config.path.img + "ajax-loader.gif"
		]
	};


	//start compiling which scripts and styles to load based on various conditions
	var jsToLoad = [
			globe.assets.js.jQuery,
			globe.assets.js.resize,
			globe.assets.js.carousel,
			globe.assets.js.collapsible,
			globe.assets.js.stickyScroll,
			globe.assets.js.delayedEnter,
			globe.assets.js.ajaxInc,
			globe.assets.js.statusmsg,
			globe.assets.js.common,
			globe.assets.js.masthead
		],
		cssToLoad = [];


	//wait for body to be ready for the rest, so we can check the body class and load accordingly
	globe.bodyready(function(){
	
		var body	 	= doc.body,
			tmplTypes	= [
					"home",
					"internal",
					"crossword",
					"article",
					"gallery",
					"staff",
					"membercenter", 
					"regi"
					
					
			],
			sections	= [
				"my-saved",
				"magazine",
				"special",
				"todays-paper",
				"search"
			],
			//get longer for loop length
			lLength = tmplTypes.length > sections.length ? tmplTypes.length : sections.length;

		//run one loop to determine type, section
		for( var x=0; x < lLength; x++ ){

			if( tmplTypes[x] ){
				if( globe.hasClass( body, "type-" + tmplTypes[x] ) ){
					globe.tmplType = tmplTypes[x];
				}
			}

			if( sections[x] ){
				if( globe.hasClass( body, "section-" + sections[x] ) ){
					globe.section = sections[x];
				}
			}
		}
		//cache some section/type lookups
		var gallery			=	globe.tmplType		=== "gallery",
			crossword       =   globe.tmplType      === "crossword",
			magazine		=	globe.section		=== "magazine",
			savedApp		=	globe.section		=== "my-saved",
			todaysPaper		=	globe.section		=== "todays-paper",
			loggedIn       	=   globe.cookie.get( "pathAuth" ), // TODO better login detection
			savedDrawer		=	window.screen.width > 480 
							&& !globe.support.touch 
							&& !globe.browser.ie6 
							&& !globe.dev.mobileOverride
							&& !globe.hasClass( body, "no-saved-drawer");
		

		//load custom fonts at > 480px
		if( window.screen.width > 480 && !savedApp && !globe.dev.mobileOverride ){
			cssToLoad.push( globe.assets.css.fonts );
			//add non-fontface classname
			docElem.className += " fontface";
		}

		
		//touch event optimizations
		
		// If it's a device that supports touch...
		var touch = globe.support.touch;
		if( touch || savedApp ) {
			jsToLoad.push( globe.assets.js.touch );
		}
		
		//when binding to click for UI behavior scripting, bind to globe.e[click, down, up, move]
		//for improved responsiveness on touch devices
		globe.e = {};
		globe.extend( globe.e, {
			click	: touch ? "vclick"		: "click",
			down		: touch ? "vmousedown"	: "mousedown",
			up		: touch ? "vmouseup"	: "mouseup",
			move		: touch ? "vmousemove"	: "mousemove"
		});
		globe.loggedIn = loggedIn;

		
		//add article JS 
		if( globe.tmplType === "article" ){
			jsToLoad.push(globe.assets.js.article);
			cssToLoad.push( "globe-comments.css" );
		}
		
		//saved section js is loaded for savedApp page
	
		if ( loggedIn ) {
		
			globe.saved = {
				drawer : savedDrawer,
				saveArticleUrl	: "/saved/article",
				savedContentUrl : "/_ajax/saved/content.jpt",
				savedPreviewUrl : "/_ajax/saved/preview.jpt"
			};
			
			if ( globe.support.localStorage ){
				jsToLoad.push( globe.assets.js.json2 )
				jsToLoad.push( globe.assets.js.savedStorage )
			}
			
			jsToLoad.push ( globe.assets.js.saved );
			
			if( savedApp ){
				jsToLoad.push( globe.assets.js.savedApp );
			}
			
			
			//My Saved Drawer and relevant dependencies
			if( savedDrawer && !savedApp ){

				jsToLoad = jsToLoad.concat( [
					globe.assets.js.uiCore,
					globe.assets.js.uiWidget,
					globe.assets.js.uiMouse,
					globe.assets.js.uiResizable,
					globe.assets.js.transfer,
					globe.assets.js.savedDrawer
				] );

				cssToLoad.push( globe.assets.css.savedDrawer );
			}

		}
		

		//today's paper and gallery use the datepicker
		if( todaysPaper || gallery || magazine ){
			
			jsToLoad.push( globe.assets.js.uiDatepicker );
			cssToLoad.push( globe.assets.css.uiDatepicker );

			//today's paper scripting
			if( todaysPaper ){
				jsToLoad.push( globe.assets.js.todaysPaper );
			}

			// magazine scripting
			if( magazine ){
				jsToLoad.push( globe.assets.js.magazine );
			}

			//photo galleries
			if( gallery ){
				jsToLoad.push( globe.assets.js.gallery );
			}
		}

		// Staff bio pages, mostly for radio-toggle interactions
		if (globe.tmplType === "staff") {
			jsToLoad.push( globe.assets.js.staff );
			cssToLoad.push( "globe-staff.css" );			
		}
		
		// Regi/member center	
		if ( globe.tmplType === "membercenter" ) {
			jsToLoad.push( globe.assets.js.memberCenter );
			cssToLoad.push( "globe-membercenter.css" );
		}

		// search engine results page	
		if ( globe.section === "search" ) {
			jsToLoad.push( globe.assets.js.serp );
			cssToLoad.push( "globe-serp.css" );			
			
		}
		
		// search engine results page	
		if ( globe.tmplType === "regi" ) {
			jsToLoad.push( globe.assets.js.regi );
			cssToLoad.push( "globe-regi-coldwell.css" );	
		}
		
		if ( crossword ) {
            jsToLoad.push( globe.assets.js.crossword );
        }
		
		if ( document.getElementById( "video" ) ) { 
  			jsToLoad.push( globe.assets.js.videoplayer );
		}

		if ( document.getElementById( "comments") ) {
			jsToLoad.push( globe.assets.js.comments );
		}

		//ad loader comes last
		if( !savedApp ){
			jsToLoad.push( globe.assets.js.adCatalog + "," + globe.assets.js.adInclude );
		}

		jsToLoad.push( globe.assets.js.contentInclude );

		//load enhanced assets
		globe.load.script( globe.config.path.js + jsToLoad.join(",") );
		
		if( cssToLoad.length ){
			globe.load.style( globe.config.path.css + cssToLoad.join(",") );
		}
	});
	
	
	//scroll to top, hide address bar on mobile devices - 1 for android, 0 for the rest
	if( !location.hash ){
		
		//scroll to top
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return "scrollTop" in doc.body ? doc.body.scrollTop : 1;
			};
			
		
		//reset to 0 on bodyready, if needed
		globe.bodyready(function(){
			var scrollTop = getScrollTop();
			window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
		});
		
		window.onload = function(){
			setTimeout(function(){
				//reset to hide addr bar at onload
				if( getScrollTop() < 20 ) {
					window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		};
	}

	// WebReflection Solution for ensuring domready fires when dynamically appending jQuery in older browsers
	(function(h,a,c,k){if(h[a]==null&&h[c]){h[a]="loading";h[c](k,c=function(){h[a]="complete";h.removeEventListener(k,c,!1)},!1)}})(document,"readyState","addEventListener","DOMContentLoaded");


})( this );	