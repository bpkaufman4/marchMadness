async function logout() {
    let request = {};
    fetchTable('logout', 'api/user/logout', request, 1)
    .then(reply => {
        if(reply.status == 'SUCCESS') document.location.replace('/login');
    });
}

getobj('logout').addEventListener('click', logout);