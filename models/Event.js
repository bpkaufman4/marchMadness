const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        GameID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DateTime: DataTypes.DATE,
        AwayTeamID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'apiteam',
                key: 'TeamID'
            }
        },
        HomeTeamID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'apiteam',
                key: 'TeamID'
            }
        }
    },
    {
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'event'
    }
);

module.exports = Event;