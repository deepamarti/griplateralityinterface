import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, addDoc, orderBy, limit, Timestamp} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbHB7UiryIBD6GO6qu1egD6nsQ4pnOx8Y",
  authDomain: "aggiempact.firebaseapp.com",
  projectId: "aggiempact",
  storageBucket: "aggiempact.appspot.com",
  messagingSenderId: "234222418719",
  appId: "1:234222418719:web:829273833325fddaaf8e2a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
var currUser = auth.currentUser;

auth.onAuthStateChanged((user) => {
  if (user) {
    currUser = user;
  } else {
    // User is signed out
    // ...
  }
});

const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
var email, password;

submitButton.addEventListener("click", function() {
    console.log('here');
    email = emailInput.value;
    console.log(email);
    password = passwordInput.value;
    console.log(password);
  
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Success! Welcome back!");
        //let data = await getAllPatients();
        //console.log(data);
        let data = {clinician_uid: "JtqWSdWkmBOuksPUUpfXUxEcdbC2",
          date_of_birth: "2023-04-30",
          dominant_hand: 0,
          dominant_hand_pre_stroke: 0,
          first_name: "Mike",
          gender: 0,
          impaired: 1, 
          last_name: "Green",
          stroke_side: 0,
          uid: "09318e0f-7bf4-429f-8e5c-0b81ae41baf9"};
        let dataMetrics = "2e74d14f-e469-40a9-83be-a1db58b793a6";
        let dataDevice = {
          "uid": dataMetrics,
          "date": Timestamp.now(),
          "measurements": [1],
          "times": [0],
          "keep": 0,
          "hand": 0,
          "maxRange": [0,0],
          "manualEntry": 0
        };
        //let dataRes = await 
        //await addDeviceData(dataDevice);
        //console.log(dataRes);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error occurred. Try again.");
        console.log(errorCode);
        console.log(errorMessage);
      });
  });

// Update name of user
function updateName(name) {
  console.log(currUser);
  if (currUser) {
    updateProfile(currUser, {
      displayName: name
    });
    print(currUser);
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

function Clinician(uid) {
  this.uid = uid;
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
      profiles.push(doc.data());
    });
    return {"empty": false, "profiles": profiles};
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