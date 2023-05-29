export function InitializeData() {
    document.getElementById("ble_submit").disabled = true;
    document.getElementById('ble_submit').style.backgroundColor = "lightgray";

    document.getElementById("ble_disconnect").disabled = true;
    
    document.getElementById('ble_right_t1').disabled = true;
    document.getElementById('ble_right_t2').disabled = true;
    document.getElementById('ble_right_t3').disabled = true;
    document.getElementById('ble_left_t1').disabled = true;
    document.getElementById('ble_left_t2').disabled = true;
    document.getElementById('ble_left_t3').disabled = true;

    document.getElementById('graph_accept_reject').style.visibility = 'hidden';
    document.getElementById('graph_accept_reject').style.height = "0%";
}

export function InitializeResults() {
    // hide until theres actually data
    // create graphs with empty datasets
    // legend (to coor code hand and trial)
    // loading for grip ratio
}
