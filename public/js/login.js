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

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#lname-login').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Provided all name fields are propegated, send fetch to login route
    if (username && email && password) { 
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        
    if (response.ok) {
        document.location.replace('/game/play'); // Navigate to game after sign up
    } else {
            alert('Failed to sign in');
    }
  }
};

document.querySelector('.login-form').addEventListener('click', () => {
    resizeBy.render('login');
    document.location.replace('api/login')
});

document.querySelector('.signup-form').addEventListener('click', () => {
    document.location.replace('api/signup')
});
  
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);