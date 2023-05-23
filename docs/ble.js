// ble data collection

import Chart from 'chart.js/auto';

// declare all html objects
const btn_connect = document.getElementById('ble_connect');
const btn_disconnect = document.getElementById("ble_disconnect");
const btn_collect_0 = document.getElementById('ble_right_t1');
const btn_collect_1 = document.getElementById('ble_right_t2');
const btn_collect_2 = document.getElementById('ble_right_t3');
const btn_collect_3 = document.getElementById('ble_left_t1');
const btn_collect_4 = document.getElementById('ble_left_t2');
const btn_collect_5 = document.getElementById('ble_left_t3');
const ble_status = document.getElementById('ble_status');

const graph = document.getElementById("ble_graph_sample");

// declare all global variables
let gdxDevice = "";
let current_index = null;
let sample_data = Array(6);
let opt_sample_data = Array(6)
let opt_sample_time = Array(6);
let right_num_samples = 0;
let left_num_samples = 0;

let done_sampling = false;

let graph_interval = null;
const time = Array.from(
    { length: 51 },
    (value, index) => Math.round(index * 0.1 *10)/10);


const ConnectDevice = async() => {
    try {
        const bleDevice = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: 'GDX' }],
            optionalServices: ['d91714ef-28b9-4f91-ba16-f0d9a604f112']
        });
        gdxDevice = await godirect.createDevice(bleDevice,  {open: true, startMeasurements: false});
        ble_status.style.backgroundColor = "#abd699";
        console.log(`Connected to: ${gdxDevice.name}`);
        graph_interval = setInterval(updateValue, 100);
        disable_button('ble_connect');
        enable_button('ble_disconnect');
        lock_method_selection();
    } catch (err) {
        console.error(err);
    }
}
btn_connect.addEventListener('click', ConnectDevice);

function DisconnectDevice() {
    try {
        if (gdxDevice != null) {
            gdxDevice.close();
            console.log(`Disconnected from: ${gdxDevice.name}`);
        }
        gdxDevice = "";
        ble_status.style.backgroundColor = "#ffe26a";
        clearInterval(graph_interval);
        enable_button('ble_connect');
        disable_button('ble_disconnect');
    } catch (err) {
        console.error(err);
    }
}
btn_disconnect.addEventListener('click', DisconnectDevice);

function CollectData(evt) {
    alert("hello");
    current_index = evt.currentTarget.index;
    console.log(current_index);
    
    // set up sensor
    const sensor = gdxDevice.getSensor(1);
    if (sensor) {
        sensor.setEnabled(true);
    }

    done_sampling = false;
    sensor.values = [];
            
    // clear data arrays
    sample_data[current_index] = [];
    opt_sample_data[current_index] = [];
    force_data = Array(51).fill(NaN);
    opt_data = Array(51).fill(NaN);
            
    gdxDevice.start(100);
    sensor.on('value-changed', (sensor) => {
        // samples for 5 seconds
        if (sensor.values.length > 51){
            done_sampling = true;
            gdxDevice.stop();
        }
        // log the sensor name, new value and units.
        console.log(`Sensor: ${sensor.name} value: ${sensor.value} units: ${sensor.unit}`);
        // add data points to the data array
        sample_data[current_index].push(sensor.value);
    }); 
}
btn_collect_0.addEventListener('click', CollectData);
btn_collect_0.index = 0;
btn_collect_1.addEventListener('click', CollectData);
btn_collect_1.index = 1;
btn_collect_2.addEventListener('click', CollectData);
btn_collect_2.index = 2;
btn_collect_3.addEventListener('click', CollectData);
btn_collect_3.index = 3;
btn_collect_4.addEventListener('click', CollectData);
btn_collect_4.index = 4;
btn_collect_5.addEventListener('click', CollectData);
btn_collect_5.index = 5;

let chart = new Chart.Line(graph, {
    data: {
        labels: time,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#75c9b7",
            borderColor: "#75c9b7",
            borderWidth: 1,
            order: 1,
            data: sample_data[0]
        }, {
            fill: false,
            lineTension: 0,
            backgroundColor: "#ea8a81",
            borderColor: "#ea8a81",
            borderWidth: 1,
            order: 0,
            data: opt_sample_data[0]
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        yAxes: [{ticks: {min: -1, max:600}}],
        },
        tooltips: {enabled: false}
    }
});

function updateValue() {
    //force_data = sample_data[current_index];
    if (done_sampling == true) {
        opt_sample_time[current_index]= FindOptSample(force_data);
        for (let i=0;i<5;i++){
            opt_data[opt_sample_time[current_index][i]*10] = force_data[opt_sample_time[current_index][i]*10];
            opt_sample_data[current_index][i] = opt_data[opt_sample_time[current_index][i]*10];
            AddToOptTable(opt_sample_time[current_index][i], opt_sample_data[current_index][i]);
        }
        // disable everything except for the accept reject buttons
        //WaitForAcceptReject();
        //
        done_sampling=false;

        // do accept reject here, and increment counters
        // disable buttons in accept reject listeners
        
    }
    chart.data.datasets[0].data = sample_data[current_index];
    chart.data.datasets[1].data = opt_sample_data[current_index];
    chart.update();
}
/*

<!--
graphing functions
<script>
    let graph_interval = null;
    const time = Array.from(
        { length: 51 },
        (value, index) => Math.round(index * 0.1 *10)/10);
    let force_data = [];
    let opt_data = Array(51).fill(NaN);
    let color = Array(51).fill("rgba(0,0,255,1.0)");
    let chart = new Chart.Line("chart_sample", {
    data: {
        labels: time,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#75c9b7",
            borderColor: "#75c9b7",
            borderWidth: 1,
            order: 1,
            data: force_data
        }, {
            fill: false,
            lineTension: 0,
            backgroundColor: "#ea8a81",
            borderColor: "#ea8a81",
            borderWidth: 1,
            order: 0,
            data: opt_data
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        yAxes: [{ticks: {min: -1, max:600}}],
        },
        tooltips: {enabled: false}
    }
    });

    function updateValue() {
        force_data = sample_data[current_index];
        if (done_sampling == true) {
            opt_sample_time[current_index]= FindOptSample(force_data);
            for (let i=0;i<5;i++){
                opt_data[opt_sample_time[current_index][i]*10] = force_data[opt_sample_time[current_index][i]*10];
                opt_sample_data[current_index][i] = opt_data[opt_sample_time[current_index][i]*10];
                AddToOptTable(opt_sample_time[current_index][i], opt_sample_data[current_index][i]);
            }
            // disable everything except for the accept reject buttons
            WaitForAcceptReject();
            //
            done_sampling=false;

            // do accept reject here, and increment counters
            // disable buttons in accept reject listeners
            
        }
        chart.data.datasets[0].data = force_data;
        chart.data.datasets[1].data = opt_data;
        chart.update();
    }
    
</script>
<!--accept/reject-->
<script>
    function Accept() {
        AcceptTrial(current_index);
    }

    function Reject() {
        ClearOptTable();
        sample_data[current_index] = [];
        opt_sample_data[current_index] = [];
        opt_sample_time[current_index] = [];
        opt_data = [];
        updateValue();
    }
</script>

-->

*/
