
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
            request.events.push({apiEventId: response[i].GameId, homeApiId: response[i].HomeTeamId, awayApiId: response[i].AwayTeamId})
        }
        
        const bulkCreateUrl = 'api/events/bulkCreate';
        const bulkCreateResponse = await fetchTable(event.target.id, bulkCreateUrl, response, 1);
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

// async function syncTeamsFromEvents() {
  
//   try {
//     await fetch('api/apiTeams/seedApiTeams', {
//       method: 'post',
//       body: JSON.stringify({}),
//       headers: { 'Content-Type':'application/json' }
//     });
//   } catch(error) {
//     console.error(error);
//   }
// }

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
// document.getElementById('getTeamsButton').addEventListener('click', syncTeamsFromEvents);
// document.getElementById('getPlayersButton').addEventListener('click', loadTeams);
