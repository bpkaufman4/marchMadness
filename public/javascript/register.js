async function signupFormHandler(event) {
    event.preventDefault();

    const email = getobj('emailSignup').value;
    const pwd = getobj('passwordSignup').value;
    const firstName = getobj('firstName').value;
    const lastName = getobj('lastName').value;

    const request = {email, pwd, firstName, lastName, statusCdMeaning: 'ACTIVE', userTypeCdMeaning: 'USER'};

    const response = await fetchTable('emailSignup', 'api/user/put', request, 1);

    if(response.status == 'SUCCESS') {
        console.log('success');
        document.location.replace('/login');
    } else {
        console.log(response);
    }
}

getobj('signupForm').addEventListener('submit', signupFormHandler);