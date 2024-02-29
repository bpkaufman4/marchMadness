const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ApiTeam extends Model {}

ApiTeam.init(
    {
        TeamID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        School: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ShortDisplayName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        TeamLogoUrl: DataTypes.STRING
    },
    {
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'apiteam'
    }
);

module.exports = ApiTeam;