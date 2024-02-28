const cron = require('node-cron');
const https = require('https');
require('dotenv').config();
const sequelize = require('./config/connection');
const { Event, ApiTeam, Player, Statistic }= require('./models');
const { QueryTypes } = require('sequelize');
const { getApiTeamFunction } = require('./controller/functions/apiTeamFunctions');
const { getEventFunction } = require('./controller/functions/EventFunctions');
const { getPlayerFunction } = require('./controller/functions/PlayerFunctions');
const { count } = require('console');
const { getTeamFunction } = require('./controller/functions/TeamFunctions');

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
    getApiTeamFunction({columnsToReturn: ['name']})
    .then(reply => {
        teams = reply.reply.map(team => team.get({plain: true}));
    })
    // cron.schedule('0 * * * *', pullEvents, {timezone: 'America/Chicago'});
    // cron.schedule('0 0 * * *', pullTeams, {timezone: 'America/Chicago'});
    // cron.schedule('0 0 * * Sunday', pullPlayers, {timezone: 'America/Chicago'});
    // cron.schedule('* * * * *', pullTodayStats, {timezone: 'America/Chicago'});
    // cron.schedule('* * * * *', pullYesterdayStats, {timezone: 'America/Chicago'});
}

function pullTodayStats() {
    const today = new Date();
    pullStats(today);
}

function pullYesterdayStats() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    pullStats(yesterday);
}

function pullEvents() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2024?key=${process.env.API_KEY}`)
    .then(reply => {
        reply.forEach(e => {
            const homeTeam = getApiTeamFunction({apiId: e.HomeTeamID, columnsToReturn: ['apiTeamId']});
            const awayTeam = getApiTeamFunction({apiId: e.AwayTeamID, columnsToReturn: ['apiTeamId']});
            Promise.all([homeTeam, awayTeam])
            .then(values => {
                const homeTeam = values[0].reply.map(event => event.get({plain: true}))[0];
                const awayTeam = values[1].reply.map(event => event.get({plain: true}))[0];
                if(homeTeam && awayTeam) {
                    Event.upsert({
                        apiEventId: e.GameID,
                        homeApiId: e.HomeTeamID,
                        awayApiId: e.AwayTeamID,
                        startDate: e.DateTime,
                        homeApiTeamId: homeTeam.apiTeamId,
                        awayApiTeamId: awayTeam.apiTeamId
                    });
                }
            })
        });
    });
}


function pullPlayers() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/PlayersByActive?key=${process.env.API_KEY}`)
    .then(reply => {
        reply.forEach(p => {
            getApiTeamFunction({apiId: p.TeamID, columnsToReturn: ['apiTeamId']})
            .then(reply => {
                const team = reply.reply.map(event => event.get({plain: true}));       
                if(team[0] && team[0].apiTeamId) {
                    Player.upsert({name: p.FirstName + ' ' + p.LastName, apiTeamId: team[0].apiTeamId, apiId: p.PlayerID});
                }
            })
        })
    })
}

function pullStats(date) {
    console.log(date);
    const string = date.toLocaleString('default', {day: '2-digit', month: 'short', year: 'numeric'}).replace(',', '');
    const elements = string.split(' ');
    const url = `https://api.sportsdata.io/v3/cbb/stats/json/BoxScores/${elements[2]}-${elements[0]}-${elements[1]}?key=${process.env.API_KEY}`;
    processGet(url)
    .then(data => {
        data.forEach(game => {
            getEventFunction({apiEventId: game.Game.GameID, columnsToReturn: ['eventId']})
            .then(reply => {
                const players = game.PlayerGames;
                const eventId = reply.reply.map(event => event.get({plain: true}));
                players.forEach(stat => {
                    getPlayerFunction({apiId: stat.PlayerID, columnsToReturn: ['playerId']})
                    .then(reply => {
                        const playerId = reply.reply.map(player => player.get({plain: true}));
                        Statistic.upsert({playerId: playerId[0].playerId, apiId: stat.StatID, points: stat.Points, eventId: eventId[0].eventId});
                    })
                })
            });
        });
    });
}


function pullTeams() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/LeagueHierarchy?key=${process.env.API_KEY}`)
    .then(reply => {
        const conferences = reply;
        conferences.forEach(conference => {
            const teams = conference.Teams;
            teams.forEach(team => {
                ApiTeam.upsert({apiId: team.TeamID, name: team.School, shortName: team.ShortDisplayName, slug: team.Key, logoUrl: team.TeamLogoUrl})
                .then(data => {
                    console.log(data);
                })
            })
        })
    })
}

module.exports = setupCron;