const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');

User.hasOne(Reference, {
    foreignKey: 'statusCd'
});
Reference.belongsTo(User);
module.exports = { User, Reference, ReferenceSet };