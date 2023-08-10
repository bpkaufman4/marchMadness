const router = require('express').Router();

const userRoutes = require('./user-routes');
const routesRoutes = require('./routes-routes');
const functionsRoutes = require('./functions-routes');
const referenceRoutes = require('./reference-routes');
const referenceSetsRoutes = require('./referenceSets-routes');
const changeLogRoutes = require('./changeLog-routes');
const postRoutes = require('./post-routes');

router.use('/user', userRoutes);
router.use('/routes', routesRoutes);
router.use('/functions', functionsRoutes);
router.use('/reference', referenceRoutes);
router.use('/referenceSets', referenceSetsRoutes);
router.use('/changeLog', changeLogRoutes);
router.use('/post', postRoutes);
module.exports = router; 