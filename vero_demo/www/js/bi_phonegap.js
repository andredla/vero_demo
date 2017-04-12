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
		db: null,


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
				erro: function(err){ noty({texto: "Não foi possivel ler o diretório.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getDirectory(opt.nome, {create: false}, function(diretorio){
					opt.callback(diretorio);
				}, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [diretorioLer]

		// Inicio [diretorioDeleta]
		diretorioDeleta: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				erro: function(err){ noty({texto: "Não foi possivel deletar o diretório.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getDirectory(opt.nome, {create: false}, function(diretorio){
					//diretorio.remove();
		    		pg.diretorioArquivos({nome: opt.nome, callback: function(files){
		    			for(var a=0; a<files.length; a++){
		    				files[a].remove();
		    			}
		    			diretorio.remove();
		    			opt.callback();
		    		}});
				}, opt.erro);	
			}, opt.erro);		

			return true;
		},
		// Fim [diretorioDeleta]

		// Inicio [diretorioArquivos]
		diretorioArquivos: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				callback: function(){},
				erro: function(err){ noty({texto: "Não foi possivel listar o diretório.", classe: "noty_erro", gruda: false}); }
			}, options);

			window.resolveLocalFileSystemURL(opt.caminho, function(fs){
				fs.getDirectory(opt.nome, {create: false}, function(diretorio){
					var directoryReader = diretorio.createReader();
					directoryReader.readEntries(function(files){
						opt.callback(files);
					}, opt.erro);
				}, opt.erro);	
			}, opt.erro);

			return true;
		},
		// Fim [diretorioArquivos]

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
				sucesso: function(){ noty({texto: "Arquivo apagado com sucesso", classe: "noty_sucesso", gruda: false}); },
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

		// Inicio [arquivoDownload]
		arquivoDownload: function(options){
			var opt = $.extend({
				caminho: cordova.file.dataDirectory,
				nome: "",
				diretorio: "temp",
				url: "",
				callback: function(){},
				sucesso: function(entry){ 
					noty({texto: "download complete: "+entry.toURL(), classe: "noty_sucesso", gruda: false}); 
					opt.callback(entry);
				},
				erro: function(error){
			    	noty({texto: "download error source "+error.source, classe: "noty_erro", gruda: false});
			    	noty({texto: "download error target "+error.target, classe: "noty_erro", gruda: false});
			    	noty({texto: "download error code"+error.code, classe: "noty_erro", gruda: false});
				}
			}, options);

			var fileTransfer = new FileTransfer();
			var url = encodeURI(opt.url);

			pg.diretorioCria({nome: opt.diretorio, callback: function(dir){
				var path = dir.toURL() + opt.nome;
				//noty({texto: path, gruda: false});
				fileTransfer.download(url, path, opt.sucesso, opt.erro, false);
			}});
		},
		// Fim [arquivoDownload]

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
		},
		// Fim [configEscreve]

		// Inicio [dbOpen]
		dbOpen: function(options){
			var opt = $.extend({
				nome: "storage",
				versao: 1,
				size: 100000,
				erro: function(erro){ noty({texto: "Não foi possivel criar o storage.<br/>"+erro, classe: "noty_erro", gruda: false}); }
			}, options);

			try{
				pg.db = openDatabase(opt.nome, opt.versao, opt.nome, opt.size);
			}catch(err){
				opt.erro(err);
				return false;
			}

			return true;
		},
		// Fim [dbOpen]

		// Inicio [dbExecute]
		dbExecute: function(options){
			var opt = $.extend({
				query: "",
				sucesso: function(q, rs){},
				erro: function(q, erro){ noty({texto: q + " erro : " + erro.message, classe: "noty_erro", gruda: false}); },
				obj_erro: function(q, erro){ opt.erro(opt.query, erro); }
			}, options);

			pg.db.transaction(function(q){
				q.executeSql(opt.query, [], opt.sucesso, opt.obj_erro);
			}, opt.erro);

			return true;
		},
		// Fim [dbExecute]


		tabelas: {
			clientes: {arquivo: "db/clientes.txt", campos: ["id", "lat", "lon", "nome", "endereco", "cidade", "uf"]},
			ofertas: {arquivo: "db/ofertas", campos: ["id", "nome", "assinatura"]},
			pessoas: {arquivo: "pessoas.txt", campos: ["id", "nome", "idade", "cor"]},
			animais: {arquivo: "animais.txt", campos: ["id", "nome", "fk_pessoa"]}
		},

		// Inicio [cdbTabela]
		cdbTabela: function(options){
			var opt = $.extend({
				tabela: null,
				find: function(obj){ return true; },
				sucesso: function(obj){},
				erro: function(){ noty({texto: "Não foi possível ler  o arquivo.", classe: "noty_erro", gruda: false}); }
			}, options);

			var ret = [];

			pg.arquivoLer({nome: opt.tabela.arquivo, callback: function(str){
				var item;
				var spt = str.split("\n");
				for(var a=0; a<spt.length; a++){
					//noty({texto: spt[a], gruda: false});
					item = spt[a].split(";");
					var obj = {};
					for(var b=0; b<item.length; b++){
						obj[opt.tabela.campos[b]] = item[b];
					}
					if(opt.find(obj) == true){
						ret.push(obj);
					}
				}
				opt.sucesso(ret);
			}, erro: opt.erro});

			return true;
		},
		// Fim [cdbTabela]

		// Inicio [cdbJoin]
		cdbJoin: function(options){
			var opt = $.extend({
				tabela: null,
				find: function(obj){ return true; },
				ret: function(ind, obj){ return true; },
				sucesso: function(obj){}
			}, options);

			var ret = [];

			for(var a=0; a<opt.tabela.length; a++){
				var temp = opt.ret(a, opt.tabela[a]);
				if(temp){
					ret.push( temp );
				}
			}

			opt.sucesso(ret);

			return true;
		},
		// Fim [cdbJoin]

		// Inicio [cdbFiltro]
		cdbFiltro: function(options){
			var opt = $.extend({
				tabela: null,
				find: function(obj){ return true; },
				sucesso: function(obj){}
			}, options);

			var ret = [];

			for(var a=0; a<opt.tabela.length; a++){
				if(opt.find(opt.tabela[a]) == true){
					ret.push(opt.tabela[a]);
				}
			}

			opt.sucesso(ret);

			return true;
		},
		// Fim [cdbFiltro]

		// Inicio [cdbTxt]
		cdbTxt: function(options){
			var opt = $.extend({
				tabela: null,
				nome: "",
				sucesso: function(){}
			}, options);

			pg.arquivoEscreve({nome: opt.nome, texto: "", callback: function(){
				var a=0;

				function write(){
					var str = "";
					var ch = "";
					
					//noty({texto: a, gruda: false});
					$.each(opt.tabela[a], function(key, value){
						str = str + ch + value;
						ch = ";";
					});

					str = str + "\n";

					pg.arquivoEscreve({nome: opt.nome, texto: str, callback: function(){
						a++;
						if(a < opt.tabela.length){
							write();
						}
					}, add: true});
				}

				write();

			}});
		}
		// Fim [cdbTxt]

	};

	window.pg = app();
	//$(function(){ $.pg.Init(); });
	
}(jQuery));