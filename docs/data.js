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
let is_BLE_selected = false;
let is_method_locked = false;
// switch between ble and man tabs
function SwitchTab(evt, TabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    
    if (!is_method_locked){
       if (TabName == 'Bluetooth') {
            is_BLE_selected = true;
        } else if (TabName == 'Manual') {
            is_BLE_selected = false
        } 
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
    } else {
        if ((TabName =='Manual' && is_BLE_selected) || (TabName =='Bluetooth' && !is_BLE_selected)) {
            // confirm if user wants to switch collection method
            let msg_text = "";
            if (TabName == 'Manual') {
                msg_text = "You are about to switch from bluetooth to manual entry. Do you want to proceed?"
            } else {
                msg_text = "You are about to switch from manual to bluetooth entry. Do you want to proceed?"
            }
            if (confirm(msg_text)) {
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

                if (TabName == 'Bluetooth') {
                    is_BLE_selected = true;
                } else if (TabName == 'Manual') {
                    is_BLE_selected = false
                } 
                is_method_locked = false;
            }
        }
    }
}

function lock_method_selection(){
    is_method_locked = true;
}