const cron = require('node-cron');
const https = require('https');
require('dotenv').config();

function setupCron() {
    pullEvents();
}

function pullEvents() {
    https.get(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2023POST?key=${process.env.API_KEY}`, (resp) => {
        resp.on('data', (data) => {
            console.log(data);
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

module.exports = setupCron;