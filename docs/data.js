function Initialize() {
    document.getElementById('data_collection').style.visibility = 'hidden';
    //document.getElementById('select_collection_method').style.visibility = 'visible';
    //document.getElementById('ble_collection').style.visibility = 'hidden';
    //document.getElementById('manual_collection').style.visibility = 'hidden';

    SwitchTab(event,'Bluetooth');
}

let is_BLE_selected = false;
let is_method_locked = false;

let trials_complete_right = 0;
let trials_complete_left = 0;

function check_BLE_support() {
    // checks bluetooth capability of browser
    const lbl_ble_supported = document.querySelector('#ble_supported');
    is_BLE_supported = navigator.bluetooth;
    if (is_BLE_supported) {
        lbl_ble_supported.innerHTML = '<span style="color:green">Bluetooth is Supported on this Browser';
    } else {
        lbl_ble_supported.innerHTML = `<span style="color:red">Bluetooth is Not Supported on this Browser`;
    }

}

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

// disables any button
function disable_button(button_name) {
    document.getElementById(button_name).disabled = true;
    document.getElementById(button_name).style.backgroundColor = "darkgray";
}

function FindOptSample(data) {
    let accept_trial = false;

    // find max
    let max = Math.max(...data);
    let max_index = data.findIndex(sample => sample === max);

    let opt_time_sample = max_index_to_time_range(max_index);
    return opt_time_sample;

    // additional checks for accept/reject
    // if min and max differ by too much, reject;
    // if double peaks
    // if let go in middle

}

function max_index_to_time_range(max_index) {
    let start, end = 0;
    if (max_index < 2) {
        start = 0.0;
        end = 0.4;
    } else if (max_index > 48) {
        start = 4.6;
        end = 5.0;
    } else {
        let temp = Math.round((max_index * 0.1 * 10)) / 10
        start = Math.round((temp - 0.2) * 10) / 10; 
        end = Math.round((temp + 0.2) * 10) / 10; 
    }
    return Array.from(
        { length: 5 }, 
        (value, index) => Math.round((start + (index * 0.1)) * 10) / 10);
    }

function AddToOptTable(opt_sample_time, opt_data) {
    var tbody = document.getElementById('opt_table');
        var trow = document.createElement('tr');
        
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        for (let i=0;i<5;i++) {
            td1.innerHTML = opt_sample_time;
            td2.innerHTML = opt_data;
            trow.appendChild(td1);
            trow.appendChild(td2);
            tbody.appendChild(trow);
        }

        
}