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