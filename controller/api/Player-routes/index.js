const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
const playerRoutes = require('./player-routes');
router.use('/player', playerRoutes);
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

module.exports = router; 