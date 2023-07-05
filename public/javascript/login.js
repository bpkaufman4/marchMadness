function signupFormHandler(event) {
    event.preventDefault();

    const email = getobj('emailSignup').value;
    const password = getobj('passwordSignup').value;

    fetch('api/users', {
        method:'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json'}
    }).then((response) => {console.log(response)})
}

getobj('signupForm').addEventListener('submit', signupFormHandler);