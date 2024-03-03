const cron = require('node-cron');
const https = require('https');
require('dotenv').config();
const sequelize = require('./config/connection');
const { Event, ApiTeam, Player, Statistic }= require('./models');
const fs = require('fs');
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

// setTimeout(() => {
//     var db = fs.readFileSync('./marchmadness.sql', 'utf8');
//     sequelize.query(db);
// }, 10000);

function setupCron() {
    pullTeams();
    cron.schedule('0 0 * * *', pullPlayers, {timezone: 'America/Chicago'});
    cron.schedule('0 * * * *', pullEvents, {timezone: 'America/Chicago'});
    cron.schedule('*/5 0 * * *', pullTodayStats, {timezone: 'America/Chicago'});
    cron.schedule('0 0 * * *', pullYesterdayStats, {timezone: 'America/Chicago'});
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
            Event.upsert(e);
        });
    });
}


function pullPlayers() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/PlayersByActive?key=${process.env.API_KEY}`)
    .then(reply => {
        reply.forEach(p => {
            Player.upsert(p);
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
            const stats = game.PlayerGames
            stats.forEach(stat => {
                    getPlayerFunction({PlayerID: stat.PlayerID})
                    .then(reply => {
                        const player = reply.reply.map(player => player.get({plain: true}));
                        if(player.length > 0) {
                            Statistic.upsert(stat);
                        }
                    })
            })
        });
    });
}


function pullTeams() {
    processGet(`https://api.sportsdata.io/v3/cbb/scores/json/TeamsBasic?key=${process.env.API_KEY}`)
    .then(reply => {
        const teams = reply;
        teams.forEach(team => {
            ApiTeam.upsert(team);
        });
    })
}

module.exports = setupCron;