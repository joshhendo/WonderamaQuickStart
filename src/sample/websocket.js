// websocket Alf 20121006

// main  //

if (websocket) {
  var webSocket = new WebSocket("ws://192.168.0.233:3000/relay");
  //var webSocket = new WebSocket("ws://137.154.151.239:3000/relay");

  webSocket.onopen = function () { };
  webSocket.onclose = function () { };

  if (!MASTER) { // only for slaves
    webSocket.onmessage = function ( evt ) { webSocketRecv( evt.data ) };
  }
}

// functions //

function webSocketSend( mesg ) {
  if (websocket) {
    console.log( "send|"+mesg );
    webSocket.send( mesg );
  }
}

function webSocketRecv( mesg ) {

  console.log("recv|" + mesg );

  var cmd = mesg.split( "," );

  if (cmd[0] == "cam") {
    handleViewChange( cmd[1] + "," + cmd[2] + "," + cmd[3] + "," + cmd[4] + "," + cmd[5] + "," + cmd[6]  );
  }
}

function getQueryStringVars() {

    var server_variables = {};
    var query_string = window.location.search.split( "?" )[ 1 ];
    if ( ! query_string ) return false;
    var get = query_string.split( "&" );

    for ( var i=0; i < get.length; i++ ) {

        var pair = get[ i ].split( "=" );
        server_variables[ pair[ 0 ] ] = unescape( pair[ 1 ] );
    }

    return server_variables;
}
