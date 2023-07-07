const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.belongsToMany(Reference, {through: 'userStatusCd'});
Reference.hasMany(User, {as: 'userStatus'});
module.exports = { User, Reference, ReferenceSet };