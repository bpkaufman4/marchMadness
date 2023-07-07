const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.hasOne(Reference, {
    foreignKey: 'statusCd'
});
Reference.belongsTo(User, {foreignKey: 'statusCd'});
User.hasOne(Reference, {
    foreignKey: 'userTypeCd'
});
Reference.belongsTo(User, {foreignKey: 'userTypeCd'});
module.exports = { User, Reference, ReferenceSet };