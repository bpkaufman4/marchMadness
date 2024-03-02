var joiningLeagueId;

const leagueButtons = document.querySelectorAll('[data-league-id]');
console.log(leagueButtons);

leagueButtons.forEach(btn => {
    btn.addEventListener('click', event => {
        console.log(event);
        getobj('modalLeagueName').innerHTML = event.target.dataset.leagueName;
        joiningLeagueId = event.target.dataset.leagueId;
    });
});

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