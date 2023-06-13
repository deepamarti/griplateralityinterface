// TEST_VALID_SIGN_IN
document.getElementById("email").value = "sjckajal@gmail.com";
document.getElementById('password').value = "password";

// TEST_INVALID_SIGN_IN
// test 1: wrong password
document.getElementById("email").value = "sjckajal@gmail.com";
document.getElementById('password').value = "notpassword";

// test 2: wrong email
document.getElementById("email").value = "notkajal@gmail.com";
document.getElementById('password').value = "password";

// TEST_INVALID_EMAIL
// test 1: special characters
document.getElementById("email").value = "#ello&g00dbye@gmail.com";
document.getElementById('password').value = "password";

// test 2: wrong format
document.getElementById("email").value = "sjckajal@gmail";
document.getElementById('password').value = "password";

// test 3: too long
document.getElementById("email").value = "e7IzCwNZefC0tzWatPmThazOMbasD0wmSMgGgOpmi0vlvb4glrRto8R@gmail.com";
document.getElementById('password').value = "password";

// TEST_INVALID_PASSWORD
// test 1: special characters
document.getElementById("email").value = "sjckajal@gmail.com";
document.getElementById('password').value = "pa$$word";

// test 2: too long
document.getElementById("email").value = "sjckajal@gmail.com";
document.getElementById('password').value = "qe0aEF7Uiksp7LKxgZPCOVA9K7fIXaCkJtJAYDTflOcYyFQLHoOtoplBUicbygdEgmZDezn9P7cMr8HYELQqHt8rWJ3GhYEJOrVctLRlQUOtyjggHiBYC0kwf5AjPMHUSAyI8DsMRsCJh97DVgVjoXTDlTlRzxibuwDFH6wqatRTotBtyJFwEWx9HIlMBg1OJd2k43Kjx4VQrmtQc4p87etcdQl1JHMCh676P4WTHkvCUV9RYvq3XVcu7YfL56YDO";