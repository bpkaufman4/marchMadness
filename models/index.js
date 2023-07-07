const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.belongsToMany(Reference, {through: 'userStatusCd', as: 'userStatus'});
Reference.hasMany(User, {as: 'userStatus', foreignKey: 'statusCd'});
module.exports = { User, Reference, ReferenceSet };