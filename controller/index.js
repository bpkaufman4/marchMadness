const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;