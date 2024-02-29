const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Statistic extends Model {}

Statistic.init(
    {
        StatID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        PlayerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
                key: 'PlayerID'
            }
        },
        Points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        GameID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'event',
                key: 'GameID'
            }
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