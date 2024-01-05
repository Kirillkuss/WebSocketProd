var stompClient = null;
function setConnectedtwo(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDivTwo').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('responseTwo').innerHTML = '';
}

function connectTwo() {
    var socket = new SockJS('/end');
    stompClient = Stomp.over(socket);  
    stompClient.connect({}, function(frame) {
        setConnectedtwo(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/firstTopic/send', function( responses ) {
            showMessageOutputTwo(JSON.parse( responses.body ));
        });
    });
}

function disconnectTwo() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnectedtwo(false);
    console.log("Disconnected");
}

function sendMessageTwo() {
    var text = document.getElementById('textTwo').value;
    stompClient.send("/test/end", {}, 
      JSON.stringify({ 'text':text}));
}

function showMessageOutputTwo( responses ) {
    var response = document.getElementById('responseTwo');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode( responses.text ));
    response.appendChild(p);
}