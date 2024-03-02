const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PlayerTeam extends Model {}

PlayerTeam.init(
    {},
    {
        sequelize,
        freezeTableName: true,
        modelName: 'playerTeam'
    }
);

module.exports = PlayerTeam;