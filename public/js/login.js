const loginFormHandler = async (event) => { // handler for when a user logs in the game starts
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/game/play');
        } else {
            alert('Failed to login');
        }
    }
};

const signupFormHandler = async (event) => { // handler for when a user signs up the game starts
    event.preventDefault();

    // const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#lname-login').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const firstName = document.querySelector('#first-name').value.true();
    const lastName = document.querySelector('#last-name').value.true();

    // Provided all name fields are propegated, send fetch to login route
    if (firstName && lastName && email && password) { 
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, firstName, lastName }),
            headers: { 'Content-Type': 'application/json' },
        });

        
    if (response.ok) {
        document.location.replace('/game/play'); // Navigate to game after sign up
    } else {
            alert('Failed to sign in');
    }
  }
};
  
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);