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
        homeApiTeamId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'apiTeam',
                key: 'apiTeamId'
            }
        },
        awayApiTeamId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'apiTeam',
                key: 'apiTeamId'
            }
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
        indexes:[
            {
                name: 'eventNDX1',
                unique: true,
                fields: [
                    'apiEventId'
                ]
            }
        ],
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'event'
    }
);

module.exports = Event;