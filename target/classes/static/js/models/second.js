var stompClient = null;
function setConnectedSecond(connected) {
    document.getElementById('connectSecond').disabled = connected;
    document.getElementById('disconnectSecond').disabled = !connected;
    document.getElementById('conversationDivTwo').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('responseTwo').innerHTML = '';
}

function connectSecond() {
    var socket = new SockJS('/second-end-point');
    stompClient = Stomp.over(socket);  
    stompClient.connect({}, function(frame) {
        setConnectedSecond(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/second', function( responses ) {
            showMessageOutputSecond(JSON.parse( responses.body ));
        });
    });
}

function disconnectSecond() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnectedSecond(false);
    console.log("Disconnected");
}

function sendMessageSecond() {
    var text = document.getElementById('textTwo').value;
    stompClient.send("/prefix/second-end-point", {}, 
      JSON.stringify({ 'text':text}));
}

function showMessageOutputSecond( responses ) {
    if( document.getElementById('responseTwo') != null ){
        $('p:even').empty();
    }
    var response = document.getElementById('responseTwo');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode( responses.text ));
    response.appendChild(p);
}