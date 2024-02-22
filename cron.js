const cron = require('node-cron');
const https = require('https');
require('dotenv').config();
const sequelize = require('./config/connection');
const { Event, ApiTeam, Player, Statistic }= require('./models');
const { QueryTypes } = require('sequelize');
const { getApiTeamFunction } = require('./controller/functions/apiTeamFunctions');
const { getEventFunction } = require('./controller/functions/EventFunctions');
const { getPlayerFunction } = require('./controller/functions/PlayerFunctions');

function processGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', chunk => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })
}

function setupCron() {
    pullEvents();
    // syncTeams();
    // pullRosters();
    // pullStats();
}

function pullEvents() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2024?key=${process.env.API_KEY}`)
    .then(reply => {
        console.log(reply[0]);
        return;
        reply.forEach(e => {
            Event.upsert({
                apiEventId: e.GameID,
                homeApiId: e.HomeTeamID,
                awayApiId: e.AwayTeamID,
                startDate: e.DateTime,
                homeTeamName: e.HomeTeam,
                AwayTeamName: e.AwayTeam
            });
        });
    });
}


function pullRosters() {
    getApiTeamFunction({columnsToReturn: ['name', 'apiTeamId']}).then(reply => {
        var interval = 500;
        var iteration = 1;
        const teams = reply.reply.map(team => team.get({plain: true}));
        teams.forEach(t => {
            setTimeout(() => {
                processGet(`https://api.sportsdata.io/v3/cbb/scores/json/PlayersBasic/${t.name}?key=${process.env.API_KEY}`)
                .then(reply => {
                    reply.forEach(p => {
                        Player.upsert({name: p.FirstName + ' ' + p.LastName, apiTeamId: t.apiTeamId, apiId: p.PlayerID});
                    })
                })
            }, interval*iteration);
            iteration++;
        })
    })
}

function pullStats() {
    getEventFunction({columnsToReturn: ['apiEventId', 'eventId']})
    .then(reply => {
        var interval = 200;
        var iteration = 1;
        const events = reply.reply.map(event => event.get({plain: true}));
        events.forEach(e => {
            setTimeout(() => {
                processGet(`https://api.sportsdata.io/v3/cbb/stats/json/BoxScore/${e.apiEventId}?key=${process.env.API_KEY}`)
                .then(reply => {
                    const playerStats = reply.PlayerGames;
                    if(playerStats) {
                        playerStats.forEach(stat => {
                            getPlayerFunction({apiId: stat.PlayerID, columnsToReturn: ['playerId']})
                            .then(player => {
                                const playerClean = player.reply.map(item => item.get({plain: true}));
                                if(playerClean.length > 0) {
                                    Statistic.upsert({playerId: playerClean[0].playerId, apiId: stat.StatID, points: stat.Points, eventId: e.eventId});
                                }
                            })
                        })
                    }
                })
            }, interval*iteration);
            iteration++;
        })
    })
}


function syncTeams() {
    const selectQuery = `SELECT distinct apiId, name from (
        select homeApiId apiId, homeTeamName name from event
        union all
        select awayApiId apiId, awayTeamName name from event
    ) dt where dt.name is not null order by apiId`;
    sequelize.query(selectQuery, {raw: true, type: QueryTypes.SELECT})
    .then(reply => {
        reply.forEach(t => {
            ApiTeam.upsert(t)
        });
    });
}

module.exports = setupCron;