const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Reference extends Model {};

Reference.init(
    {
        referenceCd: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        referenceMeaning: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        display: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        activeInd: DataTypes.INTEGER
    },
    {
        indexes:[
            {
                name: 'referenceNDX1',
                using: 'BTREE',
                fields: [
                    'email'
                ]
            }
        ],
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        underscored: false,
        modelName: 'reference'
    }
);

module.exports = Reference;