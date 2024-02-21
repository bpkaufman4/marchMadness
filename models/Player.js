const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model {}

Player.init(
    {
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apiTeamId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'apiTeam',
                key: 'apiTeamId'
            }
        },
        apiId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        indexes:[
            {
                name: 'playerNDX1',
                unique: true,
                fields: [
                    'apiId'
                ]
            }
        ],
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'player'
    }
);

module.exports = Player;