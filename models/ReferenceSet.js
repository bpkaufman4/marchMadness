const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ReferenceSet extends Model {};

ReferenceSet.init(
    {
        referenceSet: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        display: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        deletableInd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'referenceSet'
    }
);

module.exports = ReferenceSet;