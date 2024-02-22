const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Statistic extends Model {}

Statistic.init(
    {
        statisticId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'player',
                key: 'playerId'
            }
        },
        apiId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'event',
                key: 'eventId'
            }
        }
    },
    {
        indexes:[
            {
                name: 'statisticNDX1',
                unique: true,
                fields: [
                    'apiId'
                ]
            }
        ],
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'statistic'
    }
);

module.exports = Statistic;