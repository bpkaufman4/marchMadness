async function signupFormHandler(event) {
    event.preventDefault();

    const email = getobj('emailSignup').value;
    const pwd = getobj('passwordSignup').value;
    const firstName = getobj('firstName').value;
    const lastName = getobj('lastName').value;

    const request = {email, pwd, firstName, lastName, statusCdMeaning: 'ACTIVE', userTypeCdMeaning: 'USER'};
    
    const response = await fetchTable('emailSignup', 'api/user/put', request, 1);
    console.log(response);

    if(response.status == 'SUCCESS') {
        console.log('success');
        document.location.replace('/');
    } else {
        console.log(response);
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
    const email = getobj('emailLogin').value;
    const pwd = getobj('passwordLogin').value;

    const response = await fetchTable('api/users/login', {
        method:'post',
        body: JSON.stringify({
            email,
            pwd
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(JSON.stringify(response));
    }
}

getobj('signupForm').addEventListener('submit', signupFormHandler);
getobj('loginForm').addEventListener('submit', loginFormHandler);