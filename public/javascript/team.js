

function searchPlayers() {
    const searchStr = getobj('playerSearch').value;
    const leagueIdNE = getobj('leagueId').value;
    const request = {searchStr, leagueIdNE};
    fetchTable('playerSearch', '../api/player/get', request, 200)
    .then(reply => {
        getobj('searchPlayersCatch').innerHTML = '';
        console.log(reply);
        processGetPlayers(reply);
    })
}

function processGetPlayers(reply) {
    const players = reply.reply;
    players.forEach(player => {
        getobj('searchPlayersCatch').innerHTML += `
        <div class="playerDiv row">
            <img src="${player.apiTeam.TeamLogoUrl}" class="logo col-3">
            <div class="name col-6">${player.FirstName} ${player.LastName}</div>
            <button class="btn col-3 btn-primary" onclick="addToTeam(${player.PlayerID});">Add to Team</button>
        </div>
        `;
    })
}

function addToTeam(PlayerID) {
    const teamTeamId = getobj('teamId').value;
    const playerPlayerID = PlayerID;
    const request = {teamTeamId, playerPlayerID};
    console.log(request);
    fetchTable('teamId', '../api/playerTeam/put', request, 1)
    .then(reply => {
        console.log(reply);
    })
}

getobj('playerSearch').addEventListener('search', searchPlayers);