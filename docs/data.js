function SayHi() {
    alert("hi");
    document.getElementById('say_hi').innerText = "hello";
}

function Initialize() {
    document.getElementById('data_collection').style.visibility = 'hidden';
    //document.getElementById('select_collection_method').style.visibility = 'visible';
    //document.getElementById('ble_collection').style.visibility = 'hidden';
    //document.getElementById('manual_collection').style.visibility = 'hidden';

    SwitchTab(event,'Bluetooth');
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

// switch between ble and man tabs
function SwitchTab(evt, TabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(TabName).style.display = "block";
    evt.currentTarget.className += " active";
    }