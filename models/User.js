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
        statusCd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userTypeCd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastLoginDate: DataTypes.DATE,
        lastIP: DataTypes.STRING,
        primaryPhone: DataTypes.STRING,
        cellPhone: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        emailVerifyGUID: DataTypes.STRING,
        emailVerifyExpire: DataTypes.DATE,
        timeZoneId: DataTypes.STRING,
        lastActiveDateTime: DataTypes.INTEGER,
        profilePictureURL: DataTypes.STRING,
        profilePictureLocal: DataTypes.STRING
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.pwd = await bcrypt.hash(newUserData.pwd, 10);
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
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        underscored: false,
        modelName: 'user'
    }
);

module.exports = User;