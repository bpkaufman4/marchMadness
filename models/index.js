const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.belongsTo(Reference, {foreignKey: 'statusCd', as: 'userStatus'});
User.belongsTo(Reference, {foreignKey: 'userTypeCd', as: 'userType'});

module.exports = { User, Reference, ReferenceSet };