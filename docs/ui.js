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

    document.getElementById('graph_accept_reject').style.display = 'none';
    //document.getElementById('graph_accept_reject').style.display = 'flex';
}

export function InitializeResults() {
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
    document.getElementById('patient_search').style.visibility = 'visible';
    document.getElementById('patient_search').style.height = "100%";

    document.getElementById("data_collection_section").style.visibility = 'hidden';
    document.getElementById('data_collection_section').style.height = "0%";

    document.getElementById("results_section").style.visibility = 'hidden';
    document.getElementById("results_section").style.height = "0%";

    document.getElementById("admin_section").style.visibility = 'hidden';
    document.getElementById("admin_section").style.height = "0%";
}

const exportBTN = document.getElementById('show_export_data');
if (exportBTN != null) {
    exportBTN.addEventListener('click', ShowExportData);
}

function ShowExportData() {
    alert('make expoet data viisle')
}

const adminBTN = document.getElementById('show_admin_portal');
if (adminBTN != null) {
    adminBTN.addEventListener('click', ShowAdminPortal);
}

function ShowAdminPortal() {
    alert('show admin portal');
}