const cron = require('node-cron');
const https = require('https');
require('dotenv').config();

function processGet(url) {
    let returnValue;
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', chunk => {
            data += chunk;
        });
        resp.on('end', () => {
            returnValue =  JSON.parse(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    return returnValue;
}

function setupCron() {
    pullEvents();
}

function pullEvents() {
    const getScores = processGet(`https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/2023POST?key=${process.env.API_KEY}`);
    console.log(getScores);
}

module.exports = setupCron;