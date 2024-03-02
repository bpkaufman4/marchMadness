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
ApiTeam.hasMany(Event, {foreignKey: 'AwayTeamID', as: 'AwayGames'});
ApiTeam.hasMany(Event, {foreignKey: 'HomeTeamID', as: 'HomeGames'});
Event.belongsTo(ApiTeam, {foreignKey: 'AwayTeamID', as: 'AwayTeam'});
Event.belongsTo(ApiTeam, {foreignKey: 'HomeTeamID', as: 'HomeTeam'});
User.hasMany(Team, {foreignKey: 'ownerId', as: 'teams'});
Team.belongsTo(User, {foreignKey: 'ownerId', as: 'owner'});
Team.belongsTo(League, {foreignKey: 'leagueId', as: 'league'});
League.hasMany(Team, {foreignKey: 'leagueId', as: 'teams'});
Player.belongsToMany(Team, {through: PlayerTeam, as: 'teams'});
Team.belongsToMany(Player, {through: PlayerTeam, as: 'players'});
ApiTeam.hasMany(Player, {foreignKey: 'TeamID', as: 'players'});
Player.belongsTo(ApiTeam, {foreignKey: 'TeamID', as: 'apiTeam'});

module.exports = { User, Reference, ReferenceSet, ApiTeam, Event, League, Player, PlayerTeam, Statistic, Team };