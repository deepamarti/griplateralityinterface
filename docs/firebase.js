import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, addDoc, orderBy, limit, Timestamp} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { ShowDataCollection} from "./ui.js";

//window.addEventListener('load', function() {
const firebaseConfig = {
  apiKey: "AIzaSyCbHB7UiryIBD6GO6qu1egD6nsQ4pnOx8Y",
  authDomain: "aggiempact.firebaseapp.com",
  projectId: "aggiempact",
  storageBucket: "aggiempact.appspot.com",
  messagingSenderId: "234222418719",
  appId: "1:234222418719:web:829273833325fddaaf8e2a"
};

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const auth = getAuth(app);
const db = getFirestore(app);
var currUser; //= auth.currentUser;
var adminUser = false;
document.getElementById("mainBody").style.display = "none";
auth.onAuthStateChanged(async (user) => {
  setTimeout(async () => {
    console.log("Delayed for 1 second.");
    if (user) {
      adminUser = await isAdmin(currUser.uid);
      console.log("admin-user: ", adminUser);
      document.getElementById("mainBody").style.display = "inline";
      if (adminUser) {
        document.getElementById("adminNav").style.display = "block";
        document.getElementById("adminPortal").style.display = "block";
      } else {
        document.getElementById("adminNav").style.display = "none";
        document.getElementById("adminPortal").style.display = "none";
      }
      var nameHeader = document.getElementById("headerName");
      if (nameHeader != null) {
        var text = "Welcome, " + user.displayName + "!";
        nameHeader.innerHTML = text;
      }
    }
    else {
      // go back to sign in if null
      document.getElementById("mainBody").style.display = "block";
      var path_str = window.location.href;
      //var path = path_str.split("//");
      console.log(path_str);
      if (path_str.includes("index.html") == false) { // does include /index.html
        if (path_str.includes(".html") == true) { // does include .html for another file
          console.log("in here: ", path_str);
          window.location.href = "./index.html";
        }
      } 
    }
  }, 1000);
  if (user) {
    currUser = user;
    console.log("auth state changed");
    console.log(user);
    console.log("user: ", currUser);
    //localStorage.setItem("uid", currUser.uid);
  } else {
    // User is signed out
    // ...
    // direct to sign in page
    // window.location.href = "./index.html";
    console.log("user: ", user);
    console.log("go to next page");
    //window.location.href = "./index.html";
  }
});

//const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.getElementById('signInForm');
const signOutBtn = document.getElementById('signOut');
const signUp = document.getElementById('signUpForm');
const emailSU = document.getElementById('emailSignUp');
const passwordSU = document.getElementById('passwordSignUp');
const confirmPassword = document.getElementById('passwordConfirm');
const nameSU = document.getElementById('nameSignUp');
const adminBtn = document.getElementById('adminBtn');

var email, password;

function validateEmail() {
  email = emailInput.value;
  console.log(email);

  // email can be no longer than 64 characters
  if (email.length > 64) {
    document.getElementById("bad_email_error").innerHTML = "You entered an email address that is too long";
    emailInput.value = "";
    return false;
  }

  // email must be user@domain.extensiion
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(email)) {
    document.getElementById("bad_email_error").innerHTML = "";
    return true;
  } else {
    document.getElementById("bad_email_error").innerHTML = "Please enter a valid email address";
    emailInput.value = "";
    return false;
  }
}

function validatePassword() {
  password = passwordInput.value;

  // password can be no longer than 256 characters
  if (password.length > 256) {
    console.log("password too long");
    document.getElementById("bad_password_error").innerHTML = "You entered a password that is too long";
    passwordInput.value = "";
    return false;
  }

  // password can't have special characters
  var re = /^[A-Za-z0-9 ]+$/;
  if (re.test(password)) {
    console.log("valid password");
    document.getElementById("bad_password_error").innerHTML = "";
    return true;
  } else {
    console.log("invalid password");
    document.getElementById("bad_password_error").innerHTML = "Please enter a valid password";
    passwordInput.value = "";
    return false;
  }
  
}

if (form != null) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // data validation for email
    if (validateEmail() && validatePassword()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Success! Welcome back!");
          window.location.href = "./patient.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error occurred. Try again.");
          console.log(errorCode);
          console.log(errorMessage);

          document.getElementById("bad_sign_in").innerHTML = "Account does not exist";
          emailInput.value = "";
          passwordInput.value = "";

        });
    }
  
    
  });
}

if (signOutBtn != null) {
  signOutBtn.addEventListener("click", function() {
    auth.signOut().then(function() {
      console.log('Signed Out');
      window.location.href = "./index.html";
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  });
}

const fireBtn = document.getElementById("firebaseBtn");

// if (fireBtn != null) {
//     //console.log("not null");
//     //console.log(currUser);
//     fireBtn.addEventListener("click", testing);
// }

// async function testing() {
//     console.log("here");
//     console.log("testing:", currUser);
//     //let profiles = await getAllPatients();
// }


let patients = []


if (fireBtn != null) {
//function getPatientDashboard() {

  fireBtn.addEventListener('click', async function(){
    document.getElementById("firebaseBtn").disabled = true;
    let result = await getAllPatients();
    console.log(result);
    if (result["empty"] == false) {
      for (let p in result["profiles"]) {
        let element = result["profiles"][p];
        patients.push(element);
        var name = element["first_name"] + " " + element["last_name"];
        //var age = 0;
        var birthdate = element["date_of_birth"];
        var healthStatus = "Healthy";

        //Patient ID
        var patID = element["uid"];

        if (element["impaired"] == 1) {
            healthStatus = "Stroke";
        }
        else if (element["impaired"] == 2) {
            healthStatus = "Hand injury";
        }
        var gripLaterality = 0;
        AddItemsToTable(name, birthdate,healthStatus, patID);
      }
    }
    
    function AddItemsToTable(name,birthdate,healthStatus, patID){
        var tbody = document.getElementById('patientBody');
        var trow = document.createElement('tr');
        
        //Data Elements being passed in from firebase calls
        var td1 = document.createElement('td');
        //var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        //var td5 = document.createElement('td');

        //Predesigned data element to be appeneded to all data tables. TODO assign a link to each and 
        // var btn = document.createElement("button");
        // btn.innerHTML = "Select";
        // btn.value = patID;
        var btn = document.createElement("input");
        btn.setAttribute("type", "radio");
        btn.setAttribute("name", "Select");
        btn.setAttribute("value", patID);
        btn.addEventListener("click", function() {
          //btn.style.backgroundColor = "blue";
          setPatient(btn.value, name); // btn.value = patient id
          //btn.disable = true;
        });

        td1.innerHTML=name;
        //td2.innerHTML=age;
        td3.innerHTML=birthdate;
        td4.innerHTML=healthStatus;
        //td5.innerHTML=gripLaterality; 
        
        td1.className = "Patients";
        //td2.className = "Age";
        td3.className = "Birthdate";
        td4.className = "healthStatus";
        //td5.className = "laterality";
        //td6.className = "AddMeasure";
        trow.appendChild(btn);
        trow.appendChild(td1);
        //trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        //trow.appendChild(td5);
        
        tbody.appendChild(trow);
    }
  });
//}
}

let global_patient = null;

async function setPatient(id, name) {
  global_patient = id;
  console.log(id);
  var maybeAdmin = await isAdmin(currUser.uid);
  if (maybeAdmin) {
    // document.getElementById("adminExport").style.display = "block";
    // document.getElementById("exportNav").style.display = "block";
    // document.getElementById('adminExportH2').innerHTML = "Export " + name + "'s " + "Data";
  }
  ShowDataCollection();
  document.getElementById('data_collection_section').style.visibility = 'visible';
  document.getElementById('dataCollectionH2').innerHTML = "Data Collection for " + name;
  document.getElementById('resultsH2').innerHTML = "Results for " + name;

};

async function getAllDataByCollection(emr, patientUid, collectionName, fields) {
  const q = query(
    collection(db, collectionName), 
    where("uid", "==", patientUid)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return {"empty": true, "data": []};
  }
  else {
    var data = []
    querySnapshot.forEach((doc) => {
      var obj = doc.data();
      var new_obj = {};
      new_obj["emr_code"] = emr;
      for (var i = 0; i < fields.length; i++) {
        if (Array.isArray(obj[fields[i]]) == true) {
          obj[fields[i]] = obj[fields[i]].join(' ');
        }
        new_obj[fields[i]] = obj[fields[i]];
      }
      new_obj["date"] = new_obj["date"].toDate().toDateString();
      data.push(new_obj);
    });
    return {"empty": false, "data": data};
  }
}

const allDataCSVBtn = document.getElementById("allDataCSV");
if (allDataCSVBtn != null) {
  allDataCSVBtn.addEventListener('click', async function() {
    var result = await getAllData();
    if (result == false) {
      alert("Sorry! No data found to export.");
    }
  });
}

async function getAllData() {
  var pats = await getAllPatients();
  if (pats["empty"] == false) {
    var metric = [];
    var raw = [];
    var opt = [];
    for (var i = 0; i < pats["profiles"].length; i++) {
      var emr = pats["profiles"][i]["emr_code"];
      var uid = pats["profiles"][i]["uid"];
      var metricData = await getAllDataByCollection(emr, uid, "metric_data", ["date", "grip_ratio", "left_avg", "right_avg"]);
      metric = metric.concat(metricData["data"]);
      var deviceData = await getAllDataByCollection(emr, uid, "device_data", ["date", "hand", "manual_entry", "maxRange", "measurements", "times"]);
      raw = raw.concat(deviceData["data"]);
      var optDeviceData = await getAllDataByCollection(emr, uid, "opt_device_data", ["date", "hand", "manual_entry", "measurements", "times"]);
      opt = opt.concat(optDeviceData["data"]);
    }
    let today = new Date().toISOString().slice(0, 10);
    formatDataForCSV(["clinician_uid", "uid"], pats["profiles"], "patients("+today+").csv");
    formatDataForCSV([], metric, "grip_ratio("+today+").csv");
    formatDataForCSV([], raw, "raw_measurements("+today+").csv");
    formatDataForCSV([], opt, "optimal_sample_measurements("+today+").csv");
    return true;
  } else {
    return false;
  }
}

function formatDataForCSV(deleteF, dataList, fileName) {
  var csvRows = [];
  for (var i = 0; i < dataList.length; i++) {
    for (var j = 0; j < deleteF.length; j++) {
      delete dataList[i][deleteF[j]];
    }
    const values = Object.values(dataList[i]).join(',');
    console.log(values);
    csvRows.push(values);
  }
  csvRows.unshift(Object.keys(dataList[0]));
  var csvString = csvRows.join("\n");
  var link = encodeURIComponent(csvString);
  var a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,'+link;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
// let dataBtn = document.getElementById("dataBtn");

// if (dataBtn != null) {
//   let dateNow = Timestamp.fromDate(new Date());
//   dataBtn.addEventListener('click', async function  () {
//     console.log(global_patient);
//     let data = {"uid": global_patient, "date": dateNow, "measurements": [], "times": [], "keep": 1, "hand": 0, maxRange: [0, 0], manualEntry: 0};
//     // dateNow = Timestamp.fromDate(new Date());  need timestamp for firebase format
//     // hand => 0 = right, 1 = left
//     // manualEntry => 0 = bluetooth, 1 = manual
//     //await addDeviceData(data);
//   });
// }

export async function AddBLEToDatabase(sample_data, opt_sample_data, opt_sample_time) {
  console.log(sample_data);
  console.log(opt_sample_data);
  console.log(opt_sample_time);
  let dateNow = Timestamp.fromDate(new Date());
  const time = Array.from(
    { length: 51 },
    (value, index) => Math.round(index * 0.1 *10)/10);
  let ble_data = null;
  let ble_opt_data = null;
  for (let i=0;i<6;i++) {
    if (i<3) {
      // right hand
      ble_data = {
        "uid": global_patient, 
        "date": dateNow, 
        "measurements": sample_data[i], 
        "times": time, 
        "keep_trial": 1, 
        "hand": 0, 
        maxRange: [opt_sample_time[i][0], opt_sample_time[i][4]], 
        "manual_entry": 0
      };
      ble_opt_data = {
        "uid": global_patient, 
        "date": dateNow,
        "measurements": opt_sample_data[i], 
        "times": opt_sample_time[i],
        "keep_trial": 1, 
        "hand": 0,
        "manual_entry": 0
      };
    } else {
      // left hand
      ble_data = {
        "uid": global_patient, 
        "date": dateNow, 
        "measurements": sample_data[i], 
        "times": time, 
        "keep_trial": 1, 
        "hand": 1, 
        maxRange: [opt_sample_time[i][0], opt_sample_time[i][4]], 
        "manual_entry": 0
      };
      ble_opt_data = {
        "uid": global_patient, 
        "date": dateNow,
        "measurements": opt_sample_data[i], 
        "times": opt_sample_time[i],
        "keep_trial": 1, 
        "hand": 1,
        "manual_entry": 0
      };
    }
    addDeviceData(ble_data);
    addOptDeviceData(ble_opt_data);
  }
  document.getElementById('results').style.visibility = 'visible';
  document.getElementById('results').style,height = "100%";
  PopulateResults(await calcGripRatio(global_patient));
}

const mForm = document.getElementById("manual_entry");
  if (mForm != null) {
    mForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      let right_trials = Array(3).fill(NaN);
      let left_trials = Array(3).fill(NaN);
      let dateNow = Timestamp.fromDate(new Date());
      right_trials[0] = parseFloat(document.getElementById("man_right_t1").value);
      right_trials[1] = parseFloat(document.getElementById("man_right_t2").value);
      right_trials[2] = parseFloat(document.getElementById("man_right_t3").value);
      left_trials[0] = parseFloat(document.getElementById("man_left_t1").value);
      left_trials[1] = parseFloat(document.getElementById("man_left_t2").value);
      left_trials[2] = parseFloat(document.getElementById("man_left_t3").value);
      
      for (let i=0; i<3; i++) {
        right_trials[i] = Math.round(right_trials[i] * 100) / 100;
        left_trials[i] = Math.round(left_trials[i] * 100) / 100;
      }
      
      console.log(right_trials);
      console.log(left_trials);

      for (let i=0; i<3; i++) {
        // right hand = 0
        let manual_data = {
          "uid": global_patient, 
          "date": dateNow, 
          "measurements": [right_trials[i]], 
          "times": 0, 
          "keep_trial": 1, 
          "hand": 0, 
          maxRange: [0, 0], 
          "manual_entry": 1
        }
        let manual_opt_data = {
          "uid": global_patient, 
          "date": dateNow,
          "measurements": [right_trials[i]], 
          "times": 0,
          "keep_trial": 1, 
          "hand": 0,
          "manual_entry": 1
        }
        addDeviceData(manual_data);
        addOptDeviceData(manual_opt_data);
      }
      for (let i=0; i<3; i++) {
        // left hand = 1
        let manual_data = {
          "uid": global_patient, 
          "date": dateNow, 
          "measurements": [left_trials[i]], 
          "times": 0, 
          "keep_trial": 1, 
          "hand": 1, 
          maxRange: [0, 0], 
          "manual_entry": 1
        }
        let manual_opt_data = {
          "uid": global_patient, 
          "date": dateNow,
          "measurements": [left_trials[i]], 
          "times": 0,
          "keep_trial": 1, 
          "hand": 1,
          "manual_entry": 1
        }
        addDeviceData(manual_data);
        addOptDeviceData(manual_opt_data);
      }
      PopulateResults(await calcGripRatio(global_patient));
    });
  }

  function PopulateResults(grip_ratio) {
    console.log(grip_ratio);
    console.log(grip_ratio['ratio']);
    let ratio = document.getElementById("grip_ratio_txt");
    let right = document.getElementById("right_avg_text");
    let left = document.getElementById("left_avg_text");

    ratio.innerHTML = "Grip Ratio: \n" + grip_ratio['ratio'];
    right.innerHTML = "Right Avg: \n" + grip_ratio['avgRH'];
    left.innerHTML = "Left Avg: \n" + grip_ratio['avgLH'];
  }

// function testFire() {
//   console.log("in test firebase");
// }

// submitButton.addEventListener("click", function() {
//     console.log('here');
//     email = emailInput.value;
//     console.log(email);
//     password = passwordInput.value;
//     console.log(password);
  
//     signInWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log("Success! Welcome back!");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log("Error occurred. Try again.");
//         console.log(errorCode);
//         console.log(errorMessage);
//       });
//   });

// Update name of user
function updateName(user, name) {
  if (user) {
    updateProfile(user, {
      displayName: name
    });
  }
}
class Patient {
  constructor (uid, firstName, lastName, dateOfBirth, dominantHand, gender, impaired, preStrokeDominance, strokeSide, authClinicianUid) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.dominantHand = dominantHand;
    this.gender = gender;
    this.impaired = impaired;
    this.preStrokeDominance = preStrokeDominance;
    this.strokeSide = strokeSide;
    this.authClinicianUid = this.authClinicianUid;
  }
}

function Clinician(uid, admin) {
  this.uid = uid;
  this.admin = admin;
}

function OptDeviceData(uid, date, measurements, times, keep, hand, manualEntry) {
  this.uid = uid;
  this.date = date;
  this.measurements = measurements;
  this.times = times;
  this.keep = keep;
  this.hand = hand;
  this.manualEntry = manualEntry;
}

function DeviceData(uid, date, measurements, times, keep, hand, maxRange, manualEntry) {
  this.uid = uid;
  this.date = date;
  this.measurements = measurements;
  this.times = times;
  this.keep = keep;
  this.hand = hand;
  this.maxRange = maxRange;
  this.manualEntry = manualEntry;
}

function MetricData(uid, date, gripRatio, avgRH, avgLH) {
  this.uid = uid;
  this.date = date;
  this.gripRatio = gripRatio;
  this.avgRH = avgRH;
  this.avgLH = avgLH;
}

// Get patients for search
async function getAllPatients() {
  console.log("currUSER", currUser);
  //console.log("user uid", currUser.uid);
  //console.log("uid", uid);
  const q = query(collection(db, "patient_profiles"), where("clinician_uid", "==", currUser.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  if (querySnapshot.empty) {
    return {"empty": true, "profiles": []};
  }
  else {
    var profiles = [];
    querySnapshot.forEach((doc) => {
      var obj = doc.data();
      var new_obj = {};
      var obj_k = ["emr_code", "first_name", "last_name", "date_of_birth", "dominant_hand", "dominant_hand_pre_stroke", "gender", "height", "weight", "impaired", "stroke_side", "uid", "clinician_uid"];
      for (var i = 0; i < obj_k.length; i++) {
        new_obj[obj_k[i]] = obj[obj_k[i]];
      }
      profiles.push(new_obj);
    });
    return {"empty": false, "profiles": profiles};
  }
}

var scorelist = document.querySelector("#scorelist");
async function getData() {
  console.log("in get data");
  if (scorelist != null) {
      var result = await getAllPatients();
      if (result["empty"] == false) {
          var patients = result["profiles"];
          for (var i = 0; i < patients.length; i++) {
              var name = patients[i].first_name;
              var li = document.createElement("li");
              li.innerHTML = name;
              scorelist.appendChild(li);
          }
      }
      else {
          var li = document.createElement("li");
          li.innerHTML = "No results found";
          scorelist.appendChild(li);
      }
  } else {
    console.log("score list is null");
  }
}

// Check if patient exists
async function existsPatient(patientData) {
  const q = query(
    collection(db, "patient_profiles"), 
    where("clinician_uid", "==", currUser.uid),
    where("date_of_birth", "==", patientData["date_of_birth"]),
    where("first_name", "==", patientData["first_name"]),
    where("last_name", "==", patientData["last_name"]),
    where("gender", "==", patientData["gender"]),
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  if (querySnapshot.empty) {
    return {"exists": false, "patient": {}};
  }
  else {
    var data;
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
    return {"exists": true, "patient": data};
  }
}

// Get patient based on uid
async function getPatient(patientUid) {
  const q = query(
    collection(db, "patient_profiles"), 
    where("uid", "==", patientUid)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return {"exists": false, "patient": {}};
  }
  else {
    var data;
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
    return {"exists": true, "patient": data};
  }
}

// get device data 
async function getDeviceData(patientUid, typeEntry) {
  const q = query(
    collection(db, "device_data"), 
    where("uid", "==", patientUid),
    where("manual_entry", "==", typeEntry),
    orderBy("date", "desc"),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return {"exists": false, "data": {}};
  }
  else {
    var data;
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
    return {"exists": true, "data": data};
  }
}

async function createClinician(uid, admin) {
  let clinician = {
    "uid": uid,
    "admin": admin
  };
  await addClinician(clinician);
}

// Add clinician to db
async function addClinician(clinicianData) {
  const docRef = await addDoc(collection(db, "clinicians"), clinicianData);
  console.log(docRef.id);
}

async function isAdmin(uid) {
  const q = query(
    collection(db, "clinicians"), 
    where("uid", "==", uid),
    where("admin", "==", 1)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return false;
  }
  else {
    return true;
  }
}

var emailUp, passwordUp, conPassUp, adminSelected, name;

function validateUpEmail() {
  emailUp = emailSU.value;
  console.log(emailUp);

  // email can be no longer than 64 characters
  if (emailUp.length > 64) {
    document.getElementById("bad_email_up_error").innerHTML = "You entered an email address that is too long";
    emailSU.value = "";
    return false;
  }

  // email must be user@domain.extensiion
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(email)) {
    document.getElementById("bad_email_up_error").innerHTML = "";
    return true;
  } else {
    document.getElementById("bad_email_up_error").innerHTML = "Please enter a valid email address";
    emailSU.value = "";
    return false;
  }
}

function validateNameUp() {
  name = nameSU.value;

  console.log(name);
  // name can't be longer than 25 characters
  if (name.length > 25) {
    document.getElementById("bad_name_up_error").innerHTML = "You entered a name that is too long";
  }

  // no special characters or numbers
  var re = /^[A-Za-z ]+$/;
  if (re.test(name)) {
    document.getElementById("bad_name_up_error").innerHTML = "";
    return true;
  } else {
    document.getElementById("bad_name_up_error").innerHTML = "Please enter a valid name";
    passwordSU.value = "";
    return false;
  }

}

function validateUpPassword1() {
  password1Up = passwordSU.value;

  // password can be no longer than 256 characters
  if (password1Up.length > 256) {
    console.log("password too long");
    document.getElementById("bad_password1_up_error").innerHTML = "You entered a password that is too long";
    passwordSU.value = "";
    return false;
  }

  // password can't have special characters
  var re = /^[A-Za-z0-9 ]+$/;
  if (re.test(password1Up)) {
    console.log("valid password");
    document.getElementById("bad_password1_up_error").innerHTML = "";
    return true;
  } else {
    console.log("invalid password");
    document.getElementById("bad_password1_up_error").innerHTML = "Please enter a valid password";
    passwordSU.value = "";
    return false;
  }
}

function validateUpPassword2() {
  password2Up = confirmPassword.value;

  // password can be no longer than 256 characters
  if (password2Up.length > 256) {
    console.log("password too long");
    document.getElementById("bad_password2_up_error").innerHTML = "You entered a password that is too long";
    confirmPassword.value = "";
    return false;
  }

  // password can't have special characters
  var re = /^[A-Za-z0-9 ]+$/;
  if (re.test(password2Up)) {
    console.log("valid password");
    document.getElementById("bad_password2_up_error").innerHTML = "";
    return true;
  } else {
    console.log("invalid password");
    document.getElementById("bad_password2_up_error").innerHTML = "Please enter a valid password";
    confirmPassword.value = "";
    return false;
  }
}

if (signUp != null) {
  // add in sign up rules => error occurs is password is 1 letter
  signUp.addEventListener('submit', (event) => {
    event.preventDefault();
    adminSelected = adminBtn.checked ? 1 : 0;
    console.log(emailUp);
    console.log(passwordUp);
    console.log(conPassUp);
    if (validateNameUp() && validateUpEmail() && validateUpPassword1() && validateUpPassword2()) {
      if (passwordUp != conPassUp) {
        alert("Passwords do not match!");
      }
      else {
        const authSec = getAuth(secondaryApp);
        createUserWithEmailAndPassword(authSec, emailUp, passwordUp)
          .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateName(user, name);
          createClinician(user.uid, adminSelected);
          authSec.signOut();
          signUp.reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Error occurred. Try again.");
        });
      }
    }
    
  });
}

// Add patient to db
async function addPatient(patientData) {
  const docRef = await addDoc(collection(db, "patient_profiles"), patientData);
  console.log(docRef.id);
}

// Add device data to db
async function addDeviceData(deviceData) {
  // use Timestamp.now() for date
  const deviceRef = await addDoc(collection(db, "device_data"), deviceData);
  console.log(deviceRef.id);
}

// Add opt device data to db
async function addOptDeviceData(optData) {
  // use Timestamp.now() for date
  const ref = await addDoc(collection(db, "opt_device_data"), optData);
  console.log(ref.id);
}

// Add metric to db
async function addMetric(metricData) {
  // use Timestamp.now() for date
  const metricRef = await addDoc(collection(db, "metric_data"), metricData);
  console.log(metricRef.id);
}

// Get top 5 most recent metrics
async function getMetricHistory(patientUid) {
  const q = query(
    collection(db, "metric_data"), 
    where("uid", "==", patientUid),
    orderBy("date", "desc"),
    limit(5)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return {"empty": true, "data": []};
  }
  else {
    var data = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return {"empty": false, "data": data};
  }
}

// Calculate avg of both hand trials
async function calcAvgTrials(patientUid, typeEntry) {
  let dayBefore = Timestamp.fromMillis(Date.now() - 86400000*2); 
  const q = query(
    collection(db, "opt_device_data"), 
    where("uid", "==", patientUid),
    where("keep_trial", "==", 1),
    where("manual_entry", "==", typeEntry),
    where("date", "<", Timestamp.now()),
    where("date", ">=", dayBefore),
    orderBy("date", "desc"),
    limit(6)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return {"empty": true, "data": {}};
  }
  else {
    var avgRH = 0;
    var avgLH = 0;
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data["hand"] == 0) { // right
        console.log(data['measurements']);
        let sumRH = data["measurements"].reduce((a, b) => a + b, 0);
        avgRH += parseFloat((sumRH / data["measurements"].length).toFixed(2));
      } else { // left
        console.log(data['measurements']);
        let sumLH = data["measurements"].reduce((a, b) => a + b, 0);
        avgLH += parseFloat((sumLH / data["measurements"].length).toFixed(2));
      }
    });
    avgRH = parseFloat((avgRH/3).toFixed(2));
    avgLH = parseFloat((avgLH/3).toFixed(2));
    return {"empty": false, "data": {"avgRH": avgRH, "avgLH": avgLH}};
  }
}

function findClosestAge(keys, age) {
  let closestK = parseFloat(keys[0]);
  for (let k in keys) {
    let floatK = parseFloat(keys[k]);
    if (floatK <= age && floatK > closestK) {
      closestK = floatK;
    }
  }
  return closestK;
}

// Get normative data
function getNormativeData(dob, gender) {
  let age = Math.floor((new Date() - new Date(dob)) / 31557600000);

  let mensNonDominantMap = {
    "0": [44.5, 39, 50],
    "18": [44.5, 39, 50],
    "25": [46, 40, 52],
    "30": [43, 36, 50],
    "35": [41.5, 36, 47],
    "40": [42.5, 38, 47],
    "45": [38, 32, 44],
    "50": [41, 36, 46],
    "55": [37, 34, 40],
    "60": [39.5, 37, 42],
    "65": [35, 29, 41],
    "70": [36, 33, 39],
    "75": [31.5, 26, 37],
    "80": [28, 23, 33],
    "200": [28, 23, 33]
  };

  let mensDominantMap = {
    "0": [46, 42, 50],
    "18": [46, 42, 50],
    "25": [49.5, 44, 55],
    "30": [45.5, 37, 54],
    "35": [45.5, 38, 53],
    "40": [45, 38, 52],
    "45": [41.5, 35, 48],
    "50": [49.5, 39, 50],
    "55": [39.5, 32, 47],
    "60": [37.5, 30, 45],
    "65": [38.5, 31, 46],
    "70": [37.5, 33, 42],
    "75": [33.5, 30, 37],
    "80": [31, 27, 35],
    "200": [31, 27, 35],
  };

  let womensDominantMap = {
    "0": [27.5, 22, 33],
    "18": [27.5, 22, 33],
    "25": [29.5, 26, 33],
    "30": [28, 24, 32],
    "35": [28.5, 25, 32],
    "40": [29, 26, 32],
    "45": [29, 25, 33],
    "50": [27.5, 24, 31],
    "55": [25, 21, 29],
    "60": [22.5, 18, 27],
    "65": [22, 20, 24],
    "70": [21, 19, 23],
    "75": [18.5, 16, 21],
    "80": [18, 16, 20],
    "200": [18, 16, 20],
  };

  let womensNonDominantMap = {
    "0": [26, 21, 31],
    "18": [26, 21, 31],
    "25": [27.5, 23, 32],
    "30": [26.5, 23, 30],
    "35": [27.5, 23, 32],
    "40": [29.5, 25, 34],
    "45": [27.5, 22, 33],
    "50": [26, 21, 31],
    "55": [21.5, 18, 25],
    "60": [20.5, 17, 24],
    "65": [18.5, 15, 22],
    "70": [18.5, 16, 21],
    "75": [18, 15, 21],
    "80": [18.5, 16, 21],
    "200": [18.5, 16, 21],
  };

  let ageKey = findClosestAge(Object.keys(mensDominantMap), age);

  if (gender == 0) {
    return {
      "nonDom": mensDominantMap[ageKey][0],
      "dom": mensNonDominantMap[ageKey][0]
    };
  } else {
    return {
      "nonDom": womensDominantMap[ageKey][0],
      "dom": womensNonDominantMap[ageKey][0]
    };
  }
}

// Calculate grip ratio for stroke patient
async function calcStrokeGripRatio(patientInfo) {
  var gripRatio = 0.0;

  let domHand = (patientInfo["dominant_hand"] == 0) ? "Right" : "Left";
  let normData = getNormativeData(patientInfo["date_of_birth"], patientInfo["gender"]);
  let preStrokeLaterality = (patientInfo["dominant_hand_pre_stroke"] == 0) ? "Right" : "Left";
  let pareticSide = (patientInfo["stroke_side"] == 0) ? "Right" : "Left";
  let avgs = await calcAvgTrials(patientInfo["uid"], 1); // 1 = manual entry

  if (avgs["empty"] == false) {
    let nonPareticNorm = 0.0;
    let pareticNorm = 0.0;

    if (pareticSide == "Left" && preStrokeLaterality == "Right") {
      nonPareticNorm = avgs["data"]["avgRH"] / normData["nonDom"];
      pareticNorm = avgs["data"]["avgLH"] / normData["nonDom"];
    } else if (pareticSide == "Left" && preStrokeLaterality == "Left") {
      pareticNorm = avgs["data"]["avgLH"] / normData["dom"];
      nonPareticNorm = avgs["data"]["avgRH"] / normData["dom"];
    } else if (pareticSide == "Right" && preStrokeLaterality == "Right") {
      pareticNorm = avgs["data"]["avgRH"] / normData["dom"];
      nonPareticNorm = avgs["data"]["avgLH"] / normData["dom"];
    } else if (pareticSide == "Right" && preStrokeLaterality == "Left") {
      pareticNorm = avgs["data"]["avgRH"] / normData["nonDom"];
      nonPareticNorm = avgs["data"]["avgLH"] / normData["nonDom"];
    }

    gripRatio = parseFloat(((nonPareticNorm - pareticNorm) / (nonPareticNorm + pareticNorm)).toFixed(2));
    let metric = {
      "uid": patientInfo["uid"],
      "date": Timestamp.now(),
      "grip_ratio": gripRatio,
      "right_avg": avgs["data"]["avgRH"],
      "left_avg": avgs["data"]["avgLH"]
    };
    await addMetric(metric);

    return {
      "grip_ratio": gripRatio,
      "avgRH": avgs["data"]["avgRH"],
      "avgLH": avgs["data"]["avgLH"],
      "hand": domHand,
      "empty": false
    }
  } else {
    return {
      "empty": true
    };
  }
}

// Calculate grip ratio
async function calcGripRatio(patientUid) {
  var gripRatio = 0.0;
  let patient = await getPatient(patientUid);
  let patientInfo = patient["patient"];

  if (patientInfo["impaired"] == 1) {
    return await calcStrokeGripRatio(patientInfo);
  }
  else {
    let domHand = (patientInfo["dominant_hand"] == 0) ? "Right" : "Left";
    let avgs = await calcAvgTrials(patientUid, 1); // 1 = manual entry 
    if (avgs["empty"] == false) {
      let normData = getNormativeData(patientInfo["date_of_birth"], patientInfo["gender"]);
      let nonDomNorm = 0.0;
      let domNorm = 0.0;
      if (domHand == "Left") {
        nonDomNorm = avgs["data"]["avgRH"] / normData["nonDom"];
        domNorm = avgs["data"]["avgLH"] / normData["dom"];
      } else {
        domNorm = avgs["data"]["avgRH"] / normData["dom"];
        nonDomNorm = avgs["data"]["avgLH"] / normData["nonDom"];
      }

      gripRatio = parseFloat(((domNorm - nonDomNorm) / (domNorm + nonDomNorm)).toFixed(2));
      let metric = {
        "uid": patientUid,
        "date": Timestamp.now(),
        "grip_ratio": gripRatio,
        "right_avg": avgs["data"]["avgRH"],
        "left_avg": avgs["data"]["avgLH"]
      };
      await addMetric(metric);

      return {
        "ratio": gripRatio,
        "avgRH": avgs["data"]["avgRH"],
        "avgLH": avgs["data"]["avgLH"],
        "hand": domHand,
        "empty": false
      }
    } else {
      return {
        "empty": true
      };
    }
  }
}

// Register new user
//const signupButton = document.getElementById("sign-up");
//const main = document.getElementById("main");
//const createacct = document.getElementById("create-acct")
// const signupEmailIn = document.getElementById("email-signup");
// const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
// const signupPasswordIn = document.getElementById("password-signup");
// const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
// const createacctbtn = document.getElementById("create-acct-btn");
// const returnBtn = document.getElementById("return-btn");

//var signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

// createacctbtn.addEventListener("click", function() {
//     var isVerified = true;
  
//     signupEmail = signupEmailIn.value;
//     confirmSignupEmail = confirmSignupEmailIn.value;
//     if(signupEmail != confirmSignupEmail) {
//         window.alert("Email fields do not match. Try again.")
//         isVerified = false;
//     }
  
//     signupPassword = signupPasswordIn.value;
//     confirmSignUpPassword = confirmSignUpPasswordIn.value;
//     if(signupPassword != confirmSignUpPassword) {
//         window.alert("Password fields do not match. Try again.")
//         isVerified = false;
//     }
    
//     if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
//       window.alert("Please fill out all required fields.");
//       isVerified = false;
//     }
    
//     if(isVerified) {
//       createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//         .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//         window.alert("Success! Account created.");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//         window.alert("Error occurred. Try again.");
//       });
//     }
//   });
  
//   signupButton.addEventListener("click", function() {
//       main.style.display = "none";
//       createacct.style.display = "block";
//   });
  
//   returnBtn.addEventListener("click", function() {
//       main.style.display = "block";
//       createacct.style.display = "none";
//   });
//});
