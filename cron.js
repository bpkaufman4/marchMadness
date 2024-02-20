const cron = require('node-cron');
const https = require('https');
require('dotenv').config();

function setupCron() {
    pullEvents();
}

function pullEvents() {
    https.get(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2023POST?key=${process.env.API_KEY}`, reply => {
        reply.on('end', data => {
            console.log(data);
        });
    });
}

module.exports = setupCron;