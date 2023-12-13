async function loginFormHandler(event) {
    event.preventDefault();
    const email = getobj('emailLogin').value;
    const pwd = getobj('passwordLogin').value;

    const response = await fetchTable('emailLogin', 'api/user/login', {email, pwd}, 1);

    if(response.message == 'SUCCESS') {
        document.location.replace('/');
    } else {
        alert(response.message);
    }
}

getobj('loginForm').addEventListener('submit', loginFormHandler);