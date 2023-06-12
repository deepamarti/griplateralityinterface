let is_BLE_supported = false;
let is_BLE_selected = false;
let is_method_locked = false;

let trials_complete_right = 0;
let trials_complete_left = 0;

function Initialize() {
    document.getElementById('patient_search').style.display = 'block';
    document.getElementById("data_collection_section").style.display = 'none';
    document.getElementById("results_section").style.display = 'none';
    document.getElementById("admin_section").style.display = 'none';

    if (check_BLE_support()) {
        SwitchTab(onload, "Bluetooth");
    }
    
}

function check_BLE_support() {
    // checks bluetooth capability of browser
    is_BLE_supported = navigator.bluetooth;
    if (!is_BLE_supported) {
        let msg_text = "Bluetooth is not supported on this browser. Please enter data manually.";
        ResetBLE();
        ResetManual();
        document.getElementById(id="ble_status").style.backgroundColor = "lightgray";
        if (confirm(msg_text)) {
            SwitchTab(onload, 'Manual');
            
        }
        return false;
    } else {
        return true;
    }
}

function DisableAllTrials() {
    const trial_btn = [
        document.getElementById('ble_right_t1'), 
        document.getElementById('ble_right_t2'),
        document.getElementById('ble_right_t3'), 
        document.getElementById('ble_left_t1'), 
        document.getElementById('ble_left_t2'), 
        document.getElementById('ble_left_t3')];

    const undo_btn = [
        document.getElementById('undo_right_t1'), 
        document.getElementById('undo_right_t2'),
        document.getElementById('undo_right_t3'), 
        document.getElementById('undo_left_t1'), 
        document.getElementById('undo_left_t2'), 
        document.getElementById('undo_left_t3')];
        
    
    for (var i=0; i<6; i++) {
        trial_btn[i].disabled = true;
        undo_btn[i].disabled = true;
        undo_btn[i].style.visibility = 'hidden';
    }
}

// prompt user to confirm switching tabs if the manual entry form is not empty
function check_man_form_empty() {
    if ((document.getElementById("man_right_t1").value.length != 0) || 
        (document.getElementById("man_right_t2").value.length != 0) ||
        (document.getElementById("man_right_t3").value.length != 0) ||
        (document.getElementById("man_left_t1").value.length != 0) ||
        (document.getElementById("man_left_t2").value.length != 0) ||
        (document.getElementById("man_left_t3").value.length != 0)) {
        return false;
    } else {
       return true; 
    }
    
}

// switch between ble and man tabs
function SwitchTab(evt, TabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    
    // if method is not locked (user has not connected to device yet, etc.)
    if (!is_method_locked){
        if (TabName == 'Bluetooth' && check_BLE_support()) {
            if (!check_man_form_empty()) {
                let msg_text = "You are about to switch from manual to bluetooth entry. Do you want to proceed?";
                if (confirm(msg_text)) {
                    is_BLE_selected = true;
                    ResetBLE();
                    ResetManual();
                } else {
                    TabName = 'Manual';
                    is_BLE_selected = false;
                }
            } else {
                is_BLE_selected = true;
                ResetBLE();
                ResetManual();
            }
        } else if (TabName == 'Manual') {
            is_BLE_selected = false;
            ResetBLE();
            ResetManual();
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
        if (evt.currentTarget != null) {
           evt.currentTarget.className += " active"; 
        }
        is_method_locked = false;
    } else {
        if (TabName =='Manual' && is_BLE_selected) {
            // confirm if user wants to switch collection method from ble to manual
            let msg_text = "You are about to switch from bluetooth to manual entry. Do you want to proceed?";
            if (confirm(msg_text)) {
                //reset everything
                is_BLE_selected = false;
                ResetBLE();
                ResetManual();
                is_method_locked = false;
            } else {
                TabName = "Bluetooth";
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
        }
    }
}

function lock_method_selection(){
    is_method_locked = true;
}

function unlock_method_selection(){
    is_method_locked = false;
}

function ResetBLE(){
    document.getElementById("ble_status").style.backgroundColor = "#ffe26a";
    document.getElementById('ble_submit').disabled = true;
    document.getElementById('ble_connect').disabled = false;
    document.getElementById('ble_disconnect').disabled = true;
    document.getElementById("ble_retake").disabled = true;
    // clear all arrays
    trials_complete_right = 0;
    trials_complete_left = 0;

    // reenable all trials
    for (let i=1;i<=3;i++) {
        let right_name, left_name = "";
        right_name = "ble_right_t" + i;
        left_name = "ble_left_t" + i;
        
        enable_trial_button(right_name);
        enable_trial_button(left_name);
    }

    DisableAllTrials();
}

function ResetManual(){
    document.getElementById('man_submit').disabled = false;
    document.getElementById("man_retake").disabled = true;
    let hand = "";
    let num = 0;
    for (let i=0;i<6;i++) {
        if (i < 3) {
            // right hand
            hand = "right";
            num = i + 1;
        } else {
            // left hand
            hand = "left";
            num = i - 2;
        }
        let input_id = "man_" + hand + "_t" + num;
        document.getElementById(input_id).value = '';
    }
    
}

function enable_button(button_name) {
    document.getElementById(button_name).disabled = false;
    document.getElementById(button_name).style.backgroundColor = "lightgray";
}
// disables any button
function disable_button(button_name) {
    document.getElementById(button_name).disabled = true;
    document.getElementById(button_name).style.backgroundColor = "#ccc";
}

function disable_trial_button(button_name) {
    // once we accept a trial, disable and turn button green
    document.getElementById(button_name).disabled = true;
    document.getElementById(button_name).style.backgroundColor = "#abd699";
}

function enable_trial_button(button_name) {
    document.getElementById(button_name).disabled = false;
    document.getElementById(button_name).style.backgroundColor = "#4164da";
}

function ShowGraphs() {
    document.getElementById('graph_accept_reject').style.display = 'flex';
}

function FindOptSample(data) {
    // find max
    let max = Math.max(...data);
    let max_index = data.findIndex(sample => sample === max);

    let opt_time_sample = max_index_to_time_range(max_index);
    return opt_time_sample;
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
    var tbody = document.getElementById('opt_sample_table');
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

function ClearOptTable() {
    var tbody = document.getElementById('opt_sample_table');
    tbody.innerHTML = '';
}

const accept_btn = document.getElementById('accept_button')
if (accept_btn != null) {
    accept_btn.addEventListener('click', AcceptTrial);
}

function UndoTrialCnt(index) {
    if (index > 2) {
        trials_complete_left--;
    } else {
        trials_complete_right--;
    }
}

function AcceptTrial(index) {
    let hand = "";
    let num = 0;
    if (index < 3) {
        // right hand
        hand = "right";
        num = index + 1;
        trials_complete_right = trials_complete_right + 1;
    } else {
        // left hand
        hand = "left";
        num = index - 2;
        trials_complete_left = trials_complete_left + 1;
    }
    let button_name = "ble_" + hand + "_t" + num;
    ClearOptTable();
    disable_trial_button(button_name);
    // hide graphs again
    document.getElementById("graph_accept_reject").style.display = 'none';
    document.getElementById("myProgress").style.visibility = 'visible';
    document.getElementById("myProgress").style.height = "100%";
    document.getElementById("myBar").style.width = 1;
    if (trials_complete_left + trials_complete_right == 6) {
        document.getElementById('ble_submit').disabled = false;
    }
}
