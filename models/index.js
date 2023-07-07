const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

Reference.belongsTo(User, {foreignKey: 'statusCd'});
User.hasOne(Reference, {
    foreignKey: 'statusCd',
    as: 'userStatus'
});
Reference.belongsTo(User, {foreignKey: 'userTypeCd'});
User.hasOne(Reference, {
    foreignKey: 'userTypeCd',
    as: 'userType'
});
module.exports = { User, Reference, ReferenceSet };