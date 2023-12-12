const router = require('express').Router();

const userRoutes = require('./user-routes');
const routesRoutes = require('./routes-routes');
const functionsRoutes = require('./functions-routes');
const referenceRoutes = require('./reference-routes');
const referenceSetsRoutes = require('./referenceSets-routes');
const apiTeamRoutes = require('./apiTeam-routes');
const EventRoutes = require('./Event-routes');
const LeagueRoutes = require('./League-routes');
const PlayerRoutes = require('./Player-routes');
const PlayerTeamRoutes = require('./PlayerTeam-routes');
const StatisticRoutes = require('./Statistic-routes');
const TeamRoutes = require('./Team-routes');

router.use('/user', userRoutes);
router.use('/routes', routesRoutes);
router.use('/functions', functionsRoutes);
router.use('/reference', referenceRoutes);
router.use('/referenceSets', referenceSetsRoutes);
router.use('/apiTeam', apiTeamRoutes);
router.use('/Event', EventRoutes);
router.use('/League', LeagueRoutes);
router.use('/Player', PlayerRoutes);
router.use('/PlayerTeam', PlayerTeamRoutes);
router.use('/Statistic', StatisticRoutes);
router.use('/Team', TeamRoutes);
module.exports = router; 