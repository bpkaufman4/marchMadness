const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
const referenceRoutes = require('./reference-routes');
router.use('/reference', referenceRoutes);
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

module.exports = router; 