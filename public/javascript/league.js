function getRankings() {
    let request = {};
    request.leagueId = getobj('leagueId').value;
    request.orderBy = [['points', 'desc']];
    request.columnsToReturn = ['teamId', 'name', 'ownerId', 'points'];
    fetchTable('leagueId', '../api/team/get', request, 100)
    .then(reply => {
        const teams = reply.reply;
        teams.forEach(team => {
            getobj('teamsCatch').innerHTML += `
                <div class="row">
                    <div class="col-10">${team.name}</div>
                    <div class="col-2">${team.points || 0}</div>
                </div>
            `;
        })
    });
}

getRankings();