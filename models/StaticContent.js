const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class StaticContent extends Model {};

StaticContent.init(
    {
        contentType: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permalink: DataTypes.STRING,
        content: DataTypes.STRING,
        SEOTitle: DataTypes.STRING,
        SEOKeywords: DataTypes.STRING,
        SEODescription: DataTypes.STRING,
        articleData: DataTypes.STRING,
        parsedElements: DataTypes.STRING
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        underscored: false,
        modelName: 'staticContent'
    }
);

module.exports = StaticContent;