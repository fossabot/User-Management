/* global $ */
/* global Swal */

$('.form-control').focusout(function() {
	$('.form-group').removeClass('focus');
});
$('.form-control').focus(function() {
	$(this).closest('.form-group').addClass('focus');
});

$('.form-control').keyup(function() {
	if ($(this).val().length > 0) {
		$(this).closest('.form-group').addClass('filled');
	}
	else {
		$(this).closest('.form-group').removeClass('filled');
	}
});

var $formControl = $('.form-control');
$formControl.each(function() {
	if ($(this).val().length > 0) {
		$(this).closest('.form-group').addClass('filled');
	}
	else {
		$(this).closest('.form-group').removeClass('filled');
	}
});

$('.log').click(function() {
	$('.center').css('animation', 'logoutanim 0.5s forwards cubic-bezier(0.86, 0, 0.07, 1)');
	setTimeout(function() { $('.frame').css('animation', 'logoutanim 0.5s forwards cubic-bezier(0.86, 0, 0.07, 1)'); }, 200);
	$(this).remove();
	setTimeout(function() { window.location.replace("/login"); }, 500);
});

$('.close').click(function() {
	$(this).closest('.register-form').toggleClass('open');
});

$('.formset .btn').click(function() {
	var id = $('.id').val(),
		pass = $('.pass').val();
	if (id != "" && pass != "") {
		const http = new XMLHttpRequest();
		http.open('POST', '/login');
		http.setRequestHeader('Content-type', 'application/json');
		http.onreadystatechange = function() {
			if (http.readyState == XMLHttpRequest.DONE) {
				if (http.responseText == 1) {
					Swal.fire({
						type: 'success',
						title: 'Congratulations!',
						text: "You are succesfully logged in!",
						timer: 1500,
						onBeforeOpen: () => Swal.showLoading()
					}).then(() => {
						var url = '/profile';
						var form = $('<form action="' + url + '" method="post">' +
							'<input type="hidden" name="email" value="' + id + '" />' +
							'<input type="hidden" name="pass" value="' + pass + '" />' +
							'</form>');
						$('body').append(form);
						form.submit();
					});
				}
				else if (http.responseText == 0) {
					Swal.fire({
						type: 'error',
						title: 'Alert!',
						text: 'Incorrect password!'
					});
				}
				else if (http.responseText == 2) {
					Swal.fire({
						type: 'error',
						title: 'Please Check Email!',
						text: "This Account Doesn't Exists!"
					});
				}
			}
		};
		http.send(JSON.stringify({
			email: id,
			pass: pass
		}));
	}
});


$(".b").on("keyup", function(e) {
	e.target.value = e.target.value.toLowerCase();
});
$(".id").on("keyup", function(e) {
	e.target.value = e.target.value.toLowerCase();
});
$(".d").on("keyup", function(e) {
	e.target.value = e.target.value.replace(/[^\d]/, "");
});

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
var username, email, pass, ph, signup = 0;
$('.circlebtn').click(function() {
	if (signup == 0) {
		username = $('.a').val();
		email = $('.b').val();
		pass = $('.c').val();
		ph = $('.d').val();
		if (username != "" && validateEmail(email) && pass != "" && ph.length == 10) {
			signup = 1;

			$(".a").attr("disabled", "disabled");
			$(".b").attr("disabled", "disabled");
			$(".d").attr("disabled", "disabled");
			$('.c').val("");
			$('.c').focus();

			$('.aa').text("Username");
			$('.bb').text("Email");
			$('.cc').text("Confirm Password");
			$('.dd').text("Phone Number");

			$('.register-form h2').text("CONFIRM PASSWORD");
			$('.close').css('display', 'none');
			$('.register-form h2').css('color', '#ED2553');
			$('.register-form').css({
				"color": "#ED2553",
				"background": "#FFF"
			});
			$('.register-form .form-group .form-label, .register-form .form-group .form-control').css('color', '#ED2553');
		}
	}
	else if (signup == 1) {
		if ($('.c').val() != pass) return;

		const http = new XMLHttpRequest();
		http.open('POST', '/signup');
		http.setRequestHeader('Content-type', 'application/json');
		http.onreadystatechange = function() {
			if (http.readyState == XMLHttpRequest.DONE) {
				if (http.responseText == 1) {
					$('.close').css({
						"display": "inline",
						"color": "#fff",
						"font-size": "25px",
						"transform": "rotate(0deg)",
						"line-height": "55px",
						"right": "15px"
					});
					$('.register-form').css('background', '#4BB543');
					$(".close").click();
					$('.close').text("✓");
					$(".close").off('click');
				}
				else if (http.responseText == 2) {
					Swal.fire({
						type: 'error',
						title: 'Error!',
						text: "A User With Same Email ID Already Exists!"
					}).then(() => { window.location.replace("/login"); });
				}
				else {
					Swal.fire({
						type: 'error',
						title: 'Error!',
						text: "Error While Creating This Account!"
					}).then(() => { window.location.replace("/login"); });
				}
			}
		};
		http.send(JSON.stringify({
			username: username,
			email: email,
			pass: pass,
			ph: ph
		}));
	}
});






const m = 0.512286623256592433;

function buildWave(w, h) {
	const a = h / 4;
	const y = h / 2;
	const pathData = [
		'M', w * 0, y + a / 2,
		'c',
		a * m, 0, -(1 - a) * m, -a,
		a, -a,
		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a,
		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a,

		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a,
		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a,
		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a,
		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a,
		's', -(1 - a) * m, a,
		a, a,
		's', -(1 - a) * m, -a,
		a, -a
	].join(' ');
	document.querySelector('#wave').setAttribute('d', pathData);
}
buildWave(90, 60);