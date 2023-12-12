const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        eventId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        apiEventId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        homeApiId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        awayApiId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: DataTypes.DATE,
        homeScore: DataTypes.INTEGER,
        awayScore: DataTypes.INTEGER,
        homeTeamName: DataTypes.STRING,
        awayTeamName: DataTypes.STRING,
        homeTeamLogoUrl: DataTypes.STRING,
        awayTeamLogoUrl: DataTypes.STRING
    },
    {
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'event'
    }
);

module.exports = Event;