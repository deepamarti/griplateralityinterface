// functions to enable/disable sections of the UI

function Initialize() {
    document.getElementById('data_collection').style.visibility = 'hidden';
    document.getElementById('ble_submit').disabled = true;
    document.getElementById('ble_disconnect').disabled = true;
    SwitchTab(event,'Bluetooth');
}