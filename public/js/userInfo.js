console.log("Are we here yet?")

const userDataFormHandler = async (event) => {
    event.preventDefault();

    // const loggedInUser = parseInt(document.querySelector('#form-uid').textContent.trim());
    const addrLine1 = document.querySelector('#user-addr-line-1').value.trim();
    const addrLine2 = document.querySelector('#user-addr-line-2').value.trim();
    const city = document.querySelector('#user-city').value.trim();
    const state = document.querySelector('#user-state').value.trim();
    const zipCode = document.querySelector('#user-zip-code').value.trim();
    const phoneNum = document.querySelector('#user-phone').value.trim();
    const githubUrl = document.querySelector('#user-github').value.trim();
    const linkedInUrl = document.querySelector('#user-linkedin').value.trim();
    // City and State are the only things required for additional info, other than either a github or linkedin URL
    if (city && state && (githubUrl || linkedInUrl)) {
        // console.log("Are we here yet?")
        const response = await fetch('/api/users/info', { // Presumed API
            method: 'POST',
            body: JSON.stringify(
            {
                addrLine1,
                addrLine2,
                city,
                state,
                zipCode,
                phoneNum,
                githubUrl,
                linkedInUrl
            }),
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/'); // Back to homepage
    } else {
            alert('Please recheck form.');
        }
    }
};
  
document
    .querySelector('#user-data-form')
    .addEventListener('submit', userDataFormHandler);