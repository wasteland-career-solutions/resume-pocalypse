document.querySelector('.login-button').addEventListener('click', () => {
    document.location.replace('/login')
});

document.querySelector('.signup-button').addEventListener('click', () => {
    document.location.replace('/signup')
});

document.querySelector('.play-button').addEventListener('click', async () => {
    const response = await fetch('/game', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/game');
    } 
    else {
        alert(response.statusText);
    }
});

document.querySelector('.info-button').addEventListener('click', async () => {
    const response = await fetch('/userinfo', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/userinfo');
    } 
    else {
        alert(response.statusText);
    }
});