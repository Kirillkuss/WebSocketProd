let firstArray = [0];
let secondArray = [0];
let thirdArray = [0];
let fourArray = [0];
let fiveArray = [0];
let sixArray = [0];


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
    const map = Object.entries(ticks);
    //1
    document.getElementById('div1').textContent =  map[5][1];
    document.getElementById('div7').textContent =  map[5][0];
    changeColor( map[5][1], 'div1' );
    firstArray.push( map[5][1]); 
    //5
    document.getElementById('div2').textContent =  map[4][1];
    document.getElementById('div8').textContent =  map[4][0]
    changeColor( map[4][1], 'div2' );
    secondArray.push( map[4][1]);
    //4
    document.getElementById('div3').textContent =  map[3][1];
    document.getElementById('div9').textContent =  map[3][0];
    changeColor( map[3][1], 'div3' );
    thirdArray.push( map[3][1]);
    //3
    document.getElementById('div4').textContent =  map[2][1];
    document.getElementById('div10').textContent =  map[2][0];
    changeColor( map[2][1], 'div4' );
    fourArray.push( map[2][1]);
    //2
    document.getElementById('div5').textContent =  map[1][1];
    document.getElementById('div11').textContent =  map[1][0];
    changeColor( map[1][1], 'div5' );
    fiveArray.push( map[1][1]);
    //6
    document.getElementById('div6').textContent =  map[0][1];
    document.getElementById('div12').textContent =  map[0][0];
    changeColor( map[0][1], 'div6' );
    sixArray.push( map[0][1]);
}

function changeColor( array, div ){
    if ( array < 0 ){
        document.getElementById(div).className  = "p-3 mb-3 bg-danger text-dark";
    }else{
        document.getElementById(div).className  = "p-3 mb-3 bg-success text-dark";
    }
}

function getGraph(){
    const xValues = [1,2,3,4,5,6,7,8,9,10];
    var myChart = new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            label: 'Index 1',
            data: [],
            borderColor: "red",
            backgroundColor: 'black',
            fill: false
            },{
            label: 'Index 5',
            data: [],
            borderColor: "yellow",
            backgroundColor: 'black',
            fill: false
            },{
            label: 'Index 4',
            data: [],
            borderColor: "blue",
            backgroundColor: 'black',
            fill: false
            },{
            label: 'Index 3',
            data: [],
            borderColor: "green",
            backgroundColor: 'black',
            fill: false
            },{
            label: 'Index 2',
            data: [],
            borderColor: "brown",
            backgroundColor: 'black',
            fill: false
            }
            ,{
            label: 'Index 6',
            data: [],
            borderColor: "purple",
            backgroundColor: 'black',
            fill: false
            }]
        },
    borderColor: "black",
    options: {
        title: {
            display: true,
            text: "График обновления индексов"
          },
        legend: {display: true},
        scales: {
            xAxes: [{
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    }
                }]
        }
    }
    
});

// Обновление данных и перерисовка графика
function updateChart( one, two, three, four, five, six) {
    myChart.data.datasets[0].data = one;
    myChart.data.datasets[1].data = two;
    myChart.data.datasets[2].data = three;
    myChart.data.datasets[3].data = four;
    myChart.data.datasets[4].data = five;
    myChart.data.datasets[5].data = six;
    myChart.update();
}

// Пример обновления данных каждую секунду
setInterval(function() {
    if ( firstArray.length > 10 ) { firstArray.shift(); }
    if ( secondArray.length > 10 ) { secondArray.shift(); }
    if ( thirdArray.length > 10 ) { thirdArray.shift(); }
    if ( fourArray.length > 10 ) { fourArray.shift(); }
    if ( fiveArray.length > 10 ) { fiveArray.shift(); }
    if ( sixArray.length > 10 ) { sixArray.shift(); }
    updateChart(firstArray, secondArray, thirdArray, fourArray, fiveArray, sixArray ); }, 1000);
}