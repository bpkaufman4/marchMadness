const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');
const bultCreateRoutes = require('./bultCreate');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);
router.use('/bulkCreate', deleteRoutes);

module.exports = router; 