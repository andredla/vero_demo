// JavaScript Document
// bi_phonegap feito por André Lemos
// data revisao 05/04/2017
(function ($){
	var app = function(){
		return new private();
	};
		
	var private = function(){
	};

	private.prototype = {
		desenvolvedor: false,


		// Inicio [diretorioCria]
		diretorioCria: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				erro: function(err){ noty({texto: "Não foi possivel criar o diretório.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getDirectory(opt.nome, {create: true}, function(diretorio){
					opt.callback(diretorio);
				}, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [diretorioCria]

		// Inicio [diretorioLer]
		diretorioLer: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				erro: function(err){ noty({texto: "Não foi possivel criar o diretório.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getDirectory(opt.nome, {create: false}, function(diretorio){
					opt.callback(diretorio);
				}, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [diretorioLer]

		// Inicio [arquivoLer]
		arquivoLer: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				sucesso: function(fileEntry){ fileEntry.file(function(file){
					var reader = new FileReader();
					reader.onloadend = function(evt) {
						//noty({texto: evt.target.result, gruda: false});
						opt.callback(evt.target.result);
					}
					reader.readAsText(file);
				}, opt.erro); },
				erro: function(err){ noty({texto: "Não foi possivel ler o arquivo.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getFile(opt.nome, {create: false}, opt.sucesso, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [arquivoLer]

		// Inicio [arquivoDeleta]
		arquivoDeleta: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				sucesso: function(){},
				erro: function(err){ noty({texto: "Não foi possivel excluir o arquivo.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getFile(opt.nome, {create: false}, function(fileEntry){
					fileEntry.remove();
					opt.sucesso();
				}, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [arquivoDeleta]

		// Inicio [arquivoEscreve]
		arquivoEscreve: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				texto: "",
				add: false,
				callback: function(){},
				sucesso: function(writer){
					writer.onwrite = function(evt) {
						//console.log("write success");
					};
					writer.onwriteend = function(evt){
						opt.callback();
					}
					if(opt.add == true){
						writer.seek(writer.length);
					}
					writer.write(opt.texto);
				},
				erro: function(err){ noty({texto: "Não foi possivel escrever no arquivo.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getFile(opt.nome, {create: true}, function(fileEntry){
					fileEntry.createWriter(opt.sucesso, opt.erro);
				}, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [arquivoEscreve]

		// Inicio [arquivoCaminho]
		arquivoCaminho: function(options){
			var opt = $.extend({
				origem: "",
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				erro: function(err){ noty({texto: "Não foi possivel encontrar o arquivo.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getFile(opt.nome, {create: false}, function(fileEntry){
					opt.callback(fileEntry.toURL());
				}, opt.erro);	
			}, opt.erro);
		},
		// Fim [arquivoCaminho]

		// Inicio [arquivoCopia]
		arquivoCopia: function(options){
			var opt = $.extend({
				origem: "",
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				erro: function(err){ noty({texto: "Não foi possivel copiar o arquivo.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.origem, function(fileEntry){
				window.resolveLocalFileSystemURL(opt.caminho, function(directoryEntry){
					fileEntry.moveTo(directoryEntry, opt.nome, function(newFileEntry){
						opt.callback(newFileEntry);
					}, opt.erro);
				}, opt.erro);
			}, opt.erro);

			return true;
		},
		// Fim [arquivoCopia]

		// Inicio [configLer]
		configLer: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){}
			}, options);

			var ret = {};
			
			pg.arquivoLer({caminho: opt.caminho, nome: opt.nome, callback: function(str){
				var spt = str.split("\n");
				for(var a=0; a<spt.length; a++){
					var item = spt[a].split("=");
					ret[item[0]] = item[1];
				}
				opt.callback(ret);
			}
			});
			
			return true;
		},
		// Fim [configLer]

		// Inicio [configEscreve]
		configEscreve: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				dict: {},
				callback: function(){}
			}, options);

			var str = "";
			var ch = "";

			$.each(opt.dict, function(key, value){
				if(key != ""){
					str = str + ch + key + "=" + value;
					ch = "\n"
				}
				//noty({texto: key, gruda: false});
			});

			pg.arquivoEscreve({caminho: opt.caminho, nome: opt.nome, texto: str, callback: opt.callback});
		}
		// Fim [configEscreve]

	};

	window.pg = app();
	//$(function(){ $.storage.Init(); });
	
}(jQuery));