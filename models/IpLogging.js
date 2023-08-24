const { Model, DataTypes } = require('sequelize');
const User = require('../models/User');
const sequelize = require('../config/connection');

class IpLogging extends Model {};

IpLogging.init(
    {
        ipLoggingId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        script_name: DataTypes.STRING,
        request_uri: DataTypes.STRING,
        query_string: DataTypes.STRING,
        request: DataTypes.STRING,
        remote_addr: DataTypes.STRING,
        http_x_real_ip: DataTypes.STRING,
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'userId'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        modelName: 'ipLogging'
    }
);

module.exports = IpLogging;