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
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'statistic'
    }
);

module.exports = Statistic;