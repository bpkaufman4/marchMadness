const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const ReferenceSet = require('../models/ReferenceSet');

class Reference extends Model {};

Reference.init(
    {
        referenceCd: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        referenceSet: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: ReferenceSet,
                key: 'referenceSet'
            }
        },
        referenceMeaning: {
            type: DataTypes.STRING
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
                    'referenceMeaning',
                    'referenceSet'
                ]
            }
        ],
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'reference'
    }
);

module.exports = Reference;