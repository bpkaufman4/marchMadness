async function signupFormHandler(event) {
    event.preventDefault();

    const email = getobj('emailSignup').value;
    const password = getobj('passwordSignup').value;
    const firstName = getobj('firstName').value;

    const response = await fetch('api/users', {
        method:'post',
        body: JSON.stringify({
            email,
            password,
            firstName
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
        console.log('success');
    } else {
        alert(response.statusText);
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
    const email = getobj('emailLogin').value;
    const password = getobj('passwordLogin').value;

    const response = await fetch('api/users/login', {
        method:'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

getobj('signupForm').addEventListener('submit', signupFormHandler);
getobj('loginForm').addEventListener('submit', loginFormHandler);