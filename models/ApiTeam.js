const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ApiTeam extends Model {}

ApiTeam.init(
    {
        apiTeamId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminatedInd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        logoUrl: DataTypes.STRING
    },
    {
        paranoid: true,
        sequelize,
        freezeTableName: true,
        modelName: 'apiteam'
    }
);

module.exports = ApiTeam;