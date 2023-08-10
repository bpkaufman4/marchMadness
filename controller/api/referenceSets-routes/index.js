const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
const referenceSetsRoutes = require('./referenceSets-routes');
router.use('/referenceSets', referenceSetsRoutes);
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

module.exports = router; 