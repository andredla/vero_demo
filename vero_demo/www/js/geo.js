
var output = document.getElementById("output");
var out = document.getElementById("out");

// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

//document.addEventListener("deviceready",function() {
// cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.", "Use GPS, with wifi or 3G.", function(buttonIndex){
//              switch(buttonIndex) {
//                case 0: break;//cancel
//                case 1: break;//neutro option
//                case 2: break;//user go to configuration
//              }},
//              "Please Turn on GPS",//title
//              ["Cancel","Later","Go"]);//buttons
//  });

// PhoneGap is ready
//
function onDeviceReady(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {    
    var mylocation = "";
    mylocation += "lat: " + position.coords.latitude +"<br>";
    mylocation += "lng: " + position.coords.longitude+"<br><br>";    

    //mylocation += 'Altitude: ' + position.coords.altitude+ '<br />';
    //mylocation += 'Accuracy: ' + position.coords.accuracy+ '<br />';
    //mylocation += 'Altitude Accuracy: ' + position.coords.altitudeAccuracy+ '<br />';
    //mylocation += 'Heading: '+ position.coords.heading + '<br />';
    //mylocation += 'Speed: ' + position.coords.speed + '<br />';
    //mylocation += 'Timestamp: '+ new Date(position.timestamp)+ '<br />';

    output.innerHTML = mylocation;

    output.style.display = "none";
    output.style.display = "inherit";

    out.style.display = "inherit";

    document.getElementById("button").value="Atualizar Geolocalização";
}

// onError Callback receives a PositionError object
//
function onError(error) {
   // alert('4-procurando...');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            //output.innerHTML="Permission Denied, please give permission and try again";
            output.innerHTML="Permissão não concedida, favor ativar GPS e tente novamente";
            break;
        case error.POSITION_UNAVAILABLE:
            //output.innerHTML="Position information is unavailable please try after some time";
            output.innerHTML="Localização atual não encontrada, favor tentar mais tarde.";
            break;
        case error.TIMEOUT:
            //output.innerHTML ="Request Timed out, please try again";
            output.innerHTML ="Tempo excedido, favor tente novamente.";
            break;
        case error.UNKNOWN_ERROR:
           // output.innerHTML="Unknown Error please try again";
            output.innerHTML="Falha desconhecida, favor tente novamente.";
            break;
    }
}

//var db = null;
//document.addEventListener('deviceready', function() {
//  db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
//});

/* db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
    tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
    tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
  }, function() {
    console.log('Populated database OK');
  });

  db.transaction(function(tx) {
    tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
      console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
*/



