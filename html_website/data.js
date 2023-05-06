function SayHi() {
    alert("hi");
    document.getElementById('say_hi').innerText = "hello";
}

function Initialize() {
    document.getElementById('select_collection_method').style.visibility = 'visible';
    document.getElementById('ble_collection').style.visibility = 'hidden';
    document.getElementById('manual_collection').style.visibility = 'hidden';
}