const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');
const ApiTeam = require('../models/ApiTeam');
const Event = require('../models/Event');
const League = require('../models/League');
const Player = require('../models/Player');
const PlayerTeam = require('../models/PlayerTeam');
const Statistic = require('../models/Statistic');
const Team = require('../models/Team');

User.belongsTo(Reference, {foreignKey: 'statusCd', as: 'userStatus'});
User.belongsTo(Reference, {foreignKey: 'userTypeCd', as: 'userType'});
League.belongsTo(User, {foreignKey: 'ownerId', as: 'owner'});
User.hasMany(League, {foreignKey: 'ownerId', as: 'userLeagues'});

module.exports = { User, Reference, ReferenceSet, ApiTeam, League, Player, PlayerTeam, Event, Statistic, Team };