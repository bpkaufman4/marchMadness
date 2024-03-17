async function logout() {
    let request = {};
    fetchTable('logoutBtn', 'api/user/logout', request, 1)
    .then(reply => {
        if(reply.status == 'SUCCESS') document.location.replace('/login');
    });
}
if(getobj('logoutBtn')) {
    getobj('logoutBtn').addEventListener('click', logout);
}