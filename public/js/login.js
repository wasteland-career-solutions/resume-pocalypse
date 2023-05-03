const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const firstName = document.querySelector('#fname-login').value.trim();
    const lastName = document.querySelector('#lname-login').value.trim();
    // Provided all name fields are propegated, send fetch to login route
    if (email && password && firstName && lastName) { 
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, firstName, lastName }),
            headers: { 'Content-Type': 'application/json' },
        });
  
    if (response.ok) {
        document.location.replace('/'); // Navigate back to homepage
    } else {
            alert('Failed to log in');
        }
    }
};
  
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  