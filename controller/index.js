const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const api = require('./api');
const model = require('./modelDocs');

router.use('/', homeRoutes);
router.use('/api', api);
router.use('/model', model);

module.exports = router;