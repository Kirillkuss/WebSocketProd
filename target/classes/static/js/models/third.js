var stompClient = null;
function setConnectedThird(connected) {
    document.getElementById('connectThird').disabled = connected;
    document.getElementById('disconnectThird').disabled = !connected;
}

function connectThird() {
    let socket = new SockJS('/stock-ticks');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnectedThird(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/ticks', function ( ticks ) {
            showMessageOutputThird( JSON.parse( ticks.body ));
        });
    });
}

function disconnectThird() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnectedThird(false);
    console.log("Disconnected");
}


function showMessageOutputThird( ticks ) {
    const map1 = Object.entries(ticks);
    var text =  " >>> ";
    document.getElementById('div1').textContent =  map1[5][1];
    document.getElementById('div7').textContent =  map1[5][0];
    changeColor( map1[5][1], 'div1' );
    
    document.getElementById('div2').textContent =  map1[4][1];
    document.getElementById('div8').textContent =  map1[4][0]
    changeColor( map1[4][1], 'div2' );
    
    document.getElementById('div3').textContent =  map1[3][1];
    document.getElementById('div9').textContent =  map1[3][0];
    changeColor( map1[3][1], 'div3' );

    document.getElementById('div4').textContent =  map1[2][1];
    document.getElementById('div10').textContent =  map1[2][0];
    changeColor( map1[2][1], 'div4' );

    document.getElementById('div5').textContent =  map1[1][1];
    document.getElementById('div11').textContent =  map1[1][0];
    changeColor( map1[1][1], 'div5' );

    document.getElementById('div6').textContent =  map1[0][1];
    document.getElementById('div12').textContent =  map1[0][0];
    changeColor( map1[0][1], 'div6' );
}


function changeColor( array, div ){
    if ( array < 0 ){
        document.getElementById(div).className  = "p-3 mb-3 bg-danger text-dark";
    }else{
        document.getElementById(div).className  = "p-3 mb-3 bg-success text-dark";
    }
}

