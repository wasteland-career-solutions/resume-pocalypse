document.querySelector('.login-button').addEventListener('click', () => {
    document.location.replace('/login')
});

document.querySelector('.signup-button').addEventListener('click', () => {
    document.location.replace('/signup')
});

document.querySelector('.play-button').addEventListener('click', async () => {
    const response = await fetch('/api/users/play', {
        method: 'GET',
        redirect: 'follow',
    });

    if (response.redirected) {
        // document.location.replace('/game');
    } 
    if (response.status(500)) {
        // document.location.replace('/login');
    } else {
        alert('Cannot play the game until you sign in.');
    }
});