const signupFormHandler = async (event) => {
  // handler for when a user signs up the game starts
  event.preventDefault();

  // const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();

  // Provided all name fields are propegated, send fetch to login route
  if (firstName && lastName && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // Navigate to homepage after sign up
    } else {
      alert("Failed to create an account");
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
