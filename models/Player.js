const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model {}

Player.init(
    {
        PlayerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TeamID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'apiTeam',
                key: 'TeamID'
            }
        }
    },
    {
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'player'
    }
);

module.exports = Player;