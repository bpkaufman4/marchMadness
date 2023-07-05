const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        indexes:[
            {
                name: 'userNDX1',
                using: 'BTREE',
                fields: [
                    'email'
                ]
            },
            {
                name: 'userNDX2',
                using: 'BTREE',
                fields: [
                    'lastName'
                ]
            },
            {
                name: 'userNDX3',
                using: 'BTREE',
                fields: [
                    'lastName'
                ]
            }
        ],
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'user'
    }
);

module.exports = User;