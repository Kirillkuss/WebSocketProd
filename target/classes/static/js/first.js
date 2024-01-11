var stompClient = null;
function setConnectedFirst(connected) {
    document.getElementById('connectFirst').disabled = connected;
    document.getElementById('disconnectFirst').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connectFirst() {
    var socket = new SockJS('/first-end-point');
    stompClient = Stomp.over(socket);  
    stompClient.connect({}, function(frame) {
        setConnectedFirst(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/first', function( responses ) {
            showMessageOutputFirst(JSON.parse( responses.body ));
        });
    });
}

function disconnectFirst() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnectedFirst(false);
    console.log("Disconnected");
}

function sendMessageFirst() {
    var text = document.getElementById('text').value;
    stompClient.send("/prefix/first-end-point", {}, 
      JSON.stringify({ 'text':text}));
}

function showMessageOutputFirst( responses ) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode( responses.text ));
    response.appendChild(p);
}

