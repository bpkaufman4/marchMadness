const cron = require('node-cron');
const https = require('https');
require('dotenv').config();

function setupCron() {
    pullEvents();
}

function pullEvents() {
    https.get(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2023POST?key=${process.env.API_KEY}`, (resp) => {
        let data = '';
        resp.on('data', chunk => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

module.exports = setupCron;