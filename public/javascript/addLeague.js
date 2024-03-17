
function addLeague() {
    const name = getobj('leagueName').value;
    const ownerId = getobj('userId').value;
    const privateInd = getobj('password').value ? true : false;
    const password = getobj('password').value;
    fetchTable('leagueName', 'api/league/put', {name, ownerId, privateInd, password}, 1)
    .then(reply => {
        alert('League added');
        window.location.assign('home');
    });
}

getobj('addLeague').addEventListener('click', addLeague);