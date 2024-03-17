var joiningLeagueId;

const leagueButtons = document.querySelectorAll('[data-league-id].btn-primary');
const goToLeagueButtons = document.querySelectorAll('[data-league-id].btn-secondary');
console.log(leagueButtons);

leagueButtons.forEach(btn => {
    btn.addEventListener('click', event => {
        getobj('modalLeagueName').innerHTML = event.target.dataset.leagueName;
        joiningLeagueId = event.target.dataset.leagueId;
    });
});

goToLeagueButtons.forEach(btn => {
    console.log(btn);
    btn.addEventListener('click', event => {
        window.location.assign('league/'+event.target.dataset.leagueId);
    });
})

getobj('joinLeagueButton').addEventListener('click', event => {
    const name = getobj('teamName').value;
    const leagueId = joiningLeagueId;
    const ownerId = getobj('userId').value;
    const request = {name, leagueId, ownerId}
    fetchTable('joinLeagueButton', 'api/team/put', request, 1)
    .then(reply => {
        console.log(reply);
    })
})