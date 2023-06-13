// TEST ADMIN USER
document.getElementById('nameSignUp').value = "Sophie";
document.getElementById('emailSignUp').value = "shmi@ucdavis.edu";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "password";
document.getElementById('adminBtn').checked = true;

// TEXT NON-ADMIN USER
document.getElementById('nameSignUp').value = "Sophie";
document.getElementById('emailSignUp').value = "smsophiemi@gmail.com";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "password";
document.getElementById('adminBtn').checked = false;

// TEST USER ALREADY EXISTS
document.getElementById('nameSignUp').value = "Kajal";
document.getElementById('emailSignUp').value = "sjckajal@gmail.com";
document.getElementById('passwordSignUp').value = "newpassword";
document.getElementById('passwordConfirm').value = "newpassword";
document.getElementById('adminBtn').checked = "checked";

// TEST INVALID NAME
// test 1: special characters
document.getElementById('nameSignUp').value = "Soph!e";
document.getElementById('emailSignUp').value = "sophie@gmail.com";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "password";
document.getElementById('adminBtn').checked = false;

// test 2: numbers
document.getElementById('nameSignUp').value = "Sophi6";
document.getElementById('emailSignUp').value = "sophie@gmail.com";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "password";
document.getElementById('adminBtn').checked = false;

// test 3: too long
document.getElementById('nameSignUp').value = "SophieSophieSophieSophieSophie";
document.getElementById('emailSignUp').value = "sophie@gmail.com";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "password";
document.getElementById('adminBtn').checked = false;

// TEST INVALID EMAIL
// test 1: email already in use
document.getElementById('nameSignUp').value = "Mary";
document.getElementById('emailSignUp').value = "kelly@gmail.com";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "password";
document.getElementById('adminBtn').checked = false;

// TEST NON-MATCHING PASSWORD
// test 1: confirm password does not match
document.getElementById('nameSignUp').value = "Mary";
document.getElementById('emailSignUp').value = "mary@gmail.com";
document.getElementById('passwordSignUp').value = "password";
document.getElementById('passwordConfirm').value = "newpassword";
document.getElementById('adminBtn').checked = false;