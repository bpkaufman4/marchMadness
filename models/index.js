const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.hasOne(Reference, {
    foreignKey: 'statusCd',
    as: 'userStatus'
});
Reference.belongsTo(User, {foreignKey: 'statusCd'});
module.exports = { User, Reference, ReferenceSet };