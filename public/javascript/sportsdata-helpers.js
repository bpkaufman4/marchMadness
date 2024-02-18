
async function syncSchedule(event) {
    console.log(event.target);
    const url = 'https://api.sportsdata.io/v3/cbb/scores/json/TeamsBasic?key=e20de04c19364639908688eda889dea1';
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
