const router = require('express').Router();

const userRoutes = require('./user-routes');
const routesRoutes = require('./routes-routes');

router.use('/users', userRoutes);
router.use('/routes', routesRoutes);

module.exports = router;