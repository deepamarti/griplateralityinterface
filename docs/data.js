function SayHi() {
    alert("hi");
    document.getElementById('say_hi').innerText = "hello";
}

function Initialize() {
    document.getElementById('data_collection').style.visibility = 'hidden';
    //document.getElementById('select_collection_method').style.visibility = 'visible';
    //document.getElementById('ble_collection').style.visibility = 'hidden';
    //document.getElementById('manual_collection').style.visibility = 'hidden';
}

let isBLE = false;
function SetCollectionMethod(flag=false) {
    isBLE = flag;
    if (isBLE) {
        document.getElementById('ble_collection').style.visibility = 'visible';
        document.getElementById('manual_collection').remove();
    } else {
        document.getElementById('manual_collection').style.visibility = 'visible';
        document.getElementById('ble_collection').remove();
    }

}