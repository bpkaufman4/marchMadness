const cron = require('node-cron');
const https = require('https');
require('dotenv').config();
const sequelize = require('./config/connection');
const { Event, ApiTeam, Player }= require('./models');
const { QueryTypes } = require('sequelize');
const { getApiTeamFunction } = require('./controller/functions/apiTeamFunctions');

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
    cron.schedule("0 0 * * *", pullEvents);
    cron.schedule("1 0 * * *", syncTeams);
    pullRosters();
}

function pullEvents() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2023POST?key=${process.env.API_KEY}`)
    .then(reply => {
        console.log(reply[0]);
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