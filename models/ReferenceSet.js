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
        referenceMeaning: DataTypes.STRING,
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
        updatedAt: 'updated',
        freezeTableName: true,
        underscored: false,
        modelName: 'referenceSets'
    }
);

module.exports = ReferenceSet;