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
        indexes: [
            {
                name: 'ipLoggingNDX1',
                using: 'BTREE',
                fields: ['created']
            },
            {
                name: 'ipLoggingNDX2',
                using: 'BTREE',
                fields: ['script_name', 'created']
            },
            {
                name: 'ipLoggingNDX3',
                using: 'BTREE',
                fields: ['http_x_real_ip', 'created']
            },
            {
                name: 'ipLoggingNDX4',
                using: 'BTREE',
                fields: ['remote_addr', 'created']
            },
            {
                name: 'ipLoggingNDX5',
                using: 'BTREE',
                fields: ['userId', 'created']
            }
        ],
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        modelName: 'ipLogging',
        paranoid: true
    }
);

module.exports = IpLogging;