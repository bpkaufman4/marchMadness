
async function syncSchedule(event) {
    console.log(event.target);
    const url = 'https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2023POST?key=e20de04c19364639908688eda889dea1';
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options)
        .then(data => {
            return data.json();
        })
        .then(json => {
            return json;
        })

        console.log(response);
        
        var request = {};
        request.events = [];
        for(let i = 0; i < response.length; i++) {
            const event = {
                apiEventId: response[i].GameID,
                homeApiId: response[i].HomeTeamID,
                awayApiId: response[i].AwayTeamID,
                startDate: response[i].DateTimeUTC
            }
            console.log(event);
            request.events.push(event);
        }
        
        const bulkCreateUrl = 'api/event/bulkCreate';
        const bulkCreateResponse = await fetchTable(event.target.id, bulkCreateUrl, request, 1);
        console.log(bulkCreateResponse);
        
    } catch (error) {
        console.error(error);
    }
}

// const timer = ms => new Promise(res => setTimeout(res, ms));

// const teamsArray = Array.from(document.querySelectorAll('.teamInput'), (element) => element.id);


// async function loadTeams() {
//   for(let i = 0; i < teamsArray.length; i++) {
//     syncPlayersFromTeams(teamsArray[i]);
//     await timer(5000);
//   }
// }

async function syncTeamsFromEvents(event) {
    const request = {};
    const bulkCreateResponse = await fetchTable(event.target.id, 'api/apiTeam/bulkCreate', request, 1);
    console.log(bulkCreateResponse);
}

// async function syncPlayersFromTeams(team) {
//   console.log(team);
//   const url = `https://api.sportsdata.io/v3/cbb/scores/json/PlayersBasic/${team}?key=e20de04c19364639908688eda889dea1`;
//   const options = {
//     method: 'GET'
//   };
//   try {
//     const response = await fetch(url, options)
//     .then(players => {
//         return players.json();
//     })
//     .then(json => {
//         console.log(json);
//         return json;
//     })

//     const team = {
//       players: response
//     }
//     const bulkCreateUrl = 'api/players/bulkCreate';
//     const bulkCreateResponse = await fetch(bulkCreateUrl, {
//       method: 'post',
//       body: JSON.stringify(team),
//       headers: { 'Content-Type':'application/json' }
//     });
//     console.log(response);
//     console.log(bulkCreateResponse);
//   } catch (error) {
//     console.error(error);
//   }
// }
document.getElementById('getEventsButton').addEventListener('click', syncSchedule);
document.getElementById('getTeamsButton').addEventListener('click', syncTeamsFromEvents);
// document.getElementById('getPlayersButton').addEventListener('click', loadTeams);
