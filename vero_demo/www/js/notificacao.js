document.addEventListener("deviceready",notidicacao_wait,false);
function notidicacao_wait(){
	//noty({titulo: "Bitch", texto: "Vero app funcionando corretamente.", classe: "noty_sucesso", gruda: false});
	try{
		window.FirebasePlugin.onTokenRefresh(function(token) {
			// save this server-side and use it to push notifications to this device
			//alert(token);
			//enviar o token devolta para o servidor e salvar com o usuario
			}, function(error) {
			alert(error);
		});
					
		window.FirebasePlugin.onNotificationOpen(function(notification) {
			if (notification.tap){
				//usuario veio da notificacao
				if (notification.destino){
					window.location=notification.destino;
					//sincronizar.html
				}
			}else{
				//usuario ja estava com o app aberto ou em segundo plano
				//nesse caso mostrar a mensagem na notificacao in app
				if (notification.titulo && notification.texto){
					noty({titulo: notification.titulo, texto: notification.texto, classe: "noty_sucesso", gruda: false});
				}
			}
					
		}, function(error) {
				alert(error);
			}
		);		
	}
	catch(e){
		alert("erro:"+e.message);
	}
}