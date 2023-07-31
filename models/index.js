const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');
const StaticContent = require('../models/StaticContent');
const ChangeLog = require('../models/ChangeLog');

User.belongsTo(Reference, {foreignKey: 'statusCd', as: 'userStatus'});
User.belongsTo(Reference, {foreignKey: 'userTypeCd', as: 'userType'});

module.exports = { User, Reference, ReferenceSet, StaticContent, ChangeLog };