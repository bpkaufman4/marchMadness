const { Model, DataTypes } = require('sequelize');
const User = require('../models/User');
const sequelize = require('../config/connection');

class ChangeLog extends Model {};

ChangeLog.init(
    {
        changeLogId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        changeDetails: {
            type: DataTypes.STRING,
            allowNull: false
        },
        changeDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()'),
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        parentId: DataTypes.UUID,
        parentName: DataTypes.STRING,
        templateType: DataTypes.STRING
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        underscored: false,
        modelName: 'changeLog'
    }
);

module.exports = ChangeLog;