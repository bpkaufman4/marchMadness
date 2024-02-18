const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');
const bulkCreateRoutes = require('./bulkCreate');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);
router.use('/bulkCreate', bulkCreateRoutes);

module.exports = router; 