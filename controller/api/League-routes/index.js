const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
const leagueRoutes = require('./league-routes');
router.use('/league', leagueRoutes);
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

module.exports = router; 