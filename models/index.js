const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.hasOne(Reference, {
    foreignKey: 'statusCd',
    as: 'userStatus'
});
Reference.belongsToMany(User, {through: 'userStatusCd'});
module.exports = { User, Reference, ReferenceSet };