const cron = require('cron-node');

function setupCron() {
    pullEvents();
}

module.exports = setupCron;