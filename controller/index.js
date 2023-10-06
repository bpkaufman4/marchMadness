const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const api = require('./api');

const basepath = process.env.BASE_PATH;

router.use('/', homeRoutes);
router.use('/api', api);

module.exports = router, basepath;