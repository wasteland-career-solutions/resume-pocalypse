const loginFormHandler = async (event) => {
  // handler for when a user logs in the game starts
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // change this to the correct route
    } else {
      alert("Failed to login");
    }
  }
};

// document.querySelector('.submit-button').addEventListener(signupFormHandler);

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
