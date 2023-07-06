const { Model, DataTypes } = require('sequelize');

const { Reference } = require('index.js');

const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.pwd);
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
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        },
        statusCd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        statusCdDisplay: {
            type: DataTypes.VIRTUAL,
            get() {
                Reference.findOne({
                    where: {
                        referenceCd: this.statusCd
                    }
                })
                .then(dbReferenceData => {
                    return dbReferenceData.referenceMeaning;
                })
            }
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
                    'emailVerifyGUID'
                ]
            }
        ],
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        freezeTableName: true,
        underscored: false,
        modelName: 'user',
        paranoid: true
    }
);

module.exports = User;