var mmenu = "";
var mmclose = "";
function jqmmenu(){
$(function(){
	if(bi.navegador.tipo == "msie" && bi.navegador.versao < 9){
		$("a[href=\'#my-menu\']").attr({href: "menu.html"});
		return false;
	}
	mmenu = $("#my-menu");

	if(mmenu.length <= 0){ return false; }

	mmenu.mmenu({"extensions": ["pagedim-black"], "navbar": { "title" : "Menu" }, "navbars":{"height": 3, "position": "top", "content":["<span class='logo ico_logo'></span>"]} });
	window.addEventListener("orientationchange", orienta, false);
	function orienta(){ mmenu.data("mmenu").close(); }

	mmenu[0].addEventListener("touchmove", function(event){
		var page = bi.GetTelaAltura();
		var mm = bi.GetPos({el: $(".mm-listview") });
		var mm_nav = bi.GetPos({el: $(".mm-navbar-top") });
		var mm_title = bi.GetPos({el: $(".mm-navbar .mm-title") });
		//alert(mm.altura + "+" + mm_nav.altura + "+" + mm_title.altura  + "<=" + page);
		if((mm.altura + mm_nav.altura + mm_title.altura) <= page){
			event.preventDefault();
		}
	}, false);

	//function mmclose(func){ setTimeout(function(){ func(); }, 1000); return false; }
	mmclose = function(func){
		setTimeout(function(){ func(); }, 500);
		return false;
	}
});
}

function noty(options){
	var opt = $.extend({
		titulo: "",
		texto: "",
		gruda: true,
		classe: ""
	}, options);

	$(".notificacao").notification("create", {title: opt.titulo, content: opt.texto}, {sticky: opt.gruda, notificationClass: opt.classe});
}

function addScript(src, callback) {
	var s = document.createElement( 'script' );
	s.setAttribute( 'src', src );
	s.setAttribute( 'language', "JavaScript" );
	s.setAttribute( 'type', "text/javascript" );
	s.onload=callback;
	document.head.appendChild( s );
}

function addStyle(src, callback) {
	var s = document.createElement( 'link' );
	s.setAttribute( 'href', src );
	s.setAttribute( 'rel', "stylesheet" );
	s.setAttribute( 'type', "text/css" );
	s.onload=callback;
	//document.head.appendChild( s );
	document.head.insertBefore(s, document.head.childNodes[0]);
}

function include_init(){
	/*
	addStyle("css/jquery.mmenu.all.css", function(){});	
	addStyle("css/jquery-ui.css", function(){});	
	addStyle("css/animate.css", function(){});	
	addStyle("css/alertas.css", function(){});	
	addStyle("css/geral.css", function(){});
	*/
	addStyle("css/geral.css", function(){});
	addStyle("css/alertas.css", function(){});
	addStyle("css/animate.css", function(){});
	addStyle("css/jquery-ui.css", function(){});
	addStyle("css/jquery.mmenu.all.css", function(){});	


	addScript("js/jquery.js", function(){
		addScript("js/jquery-ui.js", function(){
			addScript("js/biblioteca.js", function(){
			addScript("js/bi_phonegap.js", function(){
				addScript("js/jquery.mmenu.min.all.js", function(){
					addScript("js/layout.js", function(){
						addScript("js/jqueryui_notification.js", function(){
							addScript("js/index.js", function(){ init(); });
						});
					});
				});
			});
			});
		});
	});
}