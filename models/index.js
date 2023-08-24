const User = require('../models/User');
const Reference = require('../models/Reference');
const ReferenceSet = require('../models/ReferenceSet');
const StaticContent = require('../models/StaticContent');
const ChangeLog = require('../models/ChangeLog');
const Post = require('../models/Post');

User.belongsTo(Reference, {foreignKey: 'statusCd', as: 'userStatus'});
User.belongsTo(Reference, {foreignKey: 'userTypeCd', as: 'userType'});

Post.belongsTo(User, {foreignKey: 'userId', as: 'user'});
User.hasMany(Post, {foreignKey: 'userId', as: 'posts'});

ChangeLog.belongsTo(User, {foreignKey: 'userId', as: 'user'});
User.hasMany(ChangeLog, {foreignKey: 'userId', as: 'changeLogs'});

module.exports = { User, Reference, ReferenceSet, StaticContent, ChangeLog, Post };