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

function InitializeData() {
    document.getElementById("ble_submit").disabled = true;
    document.getElementById('ble_submit').style.backgroundColor = "lightgray";
    
    document.getElementById("ble_retake").disabled = true;
    document.getElementById('ble_retake').style.backgroundColor = "lightgray";

    document.getElementById("man_retake").disabled = true;
    document.getElementById('man_retake').style.backgroundColor = "lightgray";
    
    document.getElementById("ble_disconnect").disabled = true;
    
    for (let i=0; i<6; i++) {
        trial_btn[i].disabled = true;
        undo_btn[i].disabled = true;
    }

    document.getElementById('graph_accept_reject').style.display = 'none';
}

const backBTN = document.getElementById("PatientNav");
if (backBTN != null) {
    backBTN.addEventListener('click', BackToPatient);
}

function BackToPatient() {
    // from data collection/results back to patient search
    document.getElementById('patient_search').style.display = 'block';
    document.getElementById("data_collection_section").style.display = 'none';
    document.getElementById("results_section").style.display = 'none';
    document.getElementById("admin_section").style.display = 'none';

    // clear patient table
    document.getElementById('patientBody').innerHTML = '';
    document.getElementById('firebaseBtn').click();
}

export function ShowDataCollection() {
    document.getElementById('patient_search').style.display = 'none';
    document.getElementById('data_collection_section').style.display = 'block';
    document.getElementById('results_section').style.display = 'none';
    document.getElementById("admin_section").style.display = 'none';
  
    InitializeData();
}

export function ShowResults(is_ble) {
    document.getElementById('patient_search').style.display = 'none';
    document.getElementById('data_collection_section').style.display = 'block';
    document.getElementById('results_section').style.display = 'block';
    document.getElementById("admin_section").style.display = 'none';

    location.href = '#results_section';
    if (is_ble) {
        document.getElementById('right_graph_results').style.display = 'block';
        document.getElementById('left_graph_results').style.display = 'block';
        document.getElementById('right_bar_results').style.display = 'none';
        document.getElementById('left_bar_results').style.display = 'none';
    } else {
        document.getElementById('right_graph_results').style.display = 'none';
        document.getElementById('left_graph_results').style.display = 'none';
        document.getElementById('right_bar_results').style.display = 'block';
        document.getElementById('left_bar_results').style.display = 'block';
    }
} 

const adminBTN = document.getElementById('adminNav');
if (adminBTN != null) {
    adminBTN.addEventListener('click', ShowAdminPortal);
}

function ShowAdminPortal() {
    document.getElementById('patient_search').style.display ='none';
    document.getElementById("data_collection_section").style.display ='none';
    document.getElementById("results_section").style.display ='none';
    document.getElementById("admin_section").style.display = 'grid';
}