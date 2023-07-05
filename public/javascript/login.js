async function signupFormHandler(event) {
    event.preventDefault();

    const email = getobj('emailSignup').value;
    const password = getobj('passwordSignup').value;

    const response = await fetch('api/users', {
        method:'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
        console.log('success');
    } else {
        alert(response.statusText);
    }
}

getobj('signupForm').addEventListener('submit', signupFormHandler);