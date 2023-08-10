const router = require('express').Router();

/*
------------------------------Paste into api/index.js----------------------------------
const postRoutes = require('./post-routes');
router.use('/post', postRoutes);
---------------------------------------------------------------------------------------
*/

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

module.exports = router; 