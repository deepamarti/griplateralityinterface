let next = 0;
const trial_btn = [
    document.getElementById('ble_right_t1'), 
    document.getElementById('ble_right_t2'),
    document.getElementById('ble_right_t3'), 
    document.getElementById('ble_left_t1'), 
    document.getElementById('ble_left_t2'), 
    document.getElementById('ble_left_t3')];

function InitializeData() {
    document.getElementById("ble_submit").disabled = true;
    document.getElementById('ble_submit').style.backgroundColor = "lightgray";

    document.getElementById("ble_disconnect").disabled = true;
    
    for (let i=0; i<6; i++) {
        trial_btn[i].disabled = true;
    }

    document.getElementById('graph_accept_reject').style.display = 'none';
    //document.getElementById('graph_accept_reject').style.display = 'flex';
}

function InitializeResults() {
    // hide until theres actually data
    // create graphs with empty datasets
    // legend (to coor code hand and trial)
    // loading for grip ratio
}

const backBTN = document.getElementById("back_to_patient");
if (backBTN != null) {
    backBTN.addEventListener('click', BackToPatient);
}

function BackToPatient() {
    // from data collection/results back to patient search
    document.getElementById('patient_search').style.display = 'block';
    document.getElementById("data_collection_section").style.display = 'none';
    document.getElementById("results_section").style.display = 'none';
    document.getElementById("admin_section").style.display = 'none';
}

export function ShowDataCollection() {
    document.getElementById('patient_search').style.display = 'none';
    document.getElementById('data_collection_section').style.display = 'block';
    document.getElementById('results_section').style.display = 'block';
    document.getElementById("admin_section").style.display = 'none';
  
     // initialize data collection section
     InitializeData();
     InitializeResults();
  }

const btn_connect = document.getElementById('ble_connect');
const accept = document.getElementById('accept_button');
if (btn_connect != null) {
    btn_connect.addEventListener('click', EnableTrial);
}
if (accept != null) {
    accept.addEventListener('click', EnableTrial);
}

function EnableTrial() {
    console.log('enable next trial');
    console.log(next);
    trial_btn[next].disabled = false;
    next = next + 1;
}


const exportBTN = document.getElementById('show_export_data');
if (exportBTN != null) {
    exportBTN.addEventListener('click', ShowExportData);
}

function ShowExportData() {
    alert('make export data visible')
    document.getElementById("admin_section").style.display = 'grid'

}

const adminBTN = document.getElementById('show_admin_portal');
if (adminBTN != null) {
    adminBTN.addEventListener('click', ShowAdminPortal);
}

function ShowAdminPortal() {
    document.getElementById('patient_search').style.display ='none';
    document.getElementById("data_collection_section").style.display ='none';
    document.getElementById("results_section").style.display ='none';

    document.getElementById("admin_section").style.display = 'grid';
}