async function postSignup(first_name, last_name, age, username, password) {
	const data = {
		first_name,
		last_name,
		age,
		email: username,
		password,
	};

	const response = await fetch("/api/session/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();
	if (result.respuesta === "ok") {
		window.location.href = "/";
	} else {
		console.log(result);
	}
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const first_name = document.getElementById("first_name").value;
	const last_name = document.getElementById("last_name").value;
	const age = document.getElementById("age").value;

	postSignup(first_name, last_name, age, username, password).then((datos) =>
		console.log("estoy registrandome", datos)
	);
});
