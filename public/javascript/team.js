

function searchPlayers() {
    const searchStr = getobj('playerSearch').value;
    const leagueIdNE = getobj('leagueId').value;
    const request = {searchStr, leagueIdNE};
    fetchTable('playerSearch', '../api/player/get', request, 25)
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
        <div class="playerDiv">
            <img src="${player.apiTeam.TeamLogoUrl}">
            <div>${player.FirstName} ${player.LastName}</div>
            <button onclick="addToTeam(${player.PlayerID});">Add to Team</button>
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