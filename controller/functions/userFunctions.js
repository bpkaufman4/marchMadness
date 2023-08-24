const { User, Post } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

                        User.belongsTo(Reference, {foreignKey: 'statusCd', as: 'status'});
                        User.belongsTo(Reference, {foreignKey: 'userTypeCd', as: 'userType'});
--------------------------------------------------------------------------------------------------------------------------------
*/

function getUserFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.statusCd)'), 'statusCdMeaning']);
        newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.statusCd)'), 'statusCdDisplay']);
        newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.userTypeCd)'), 'userTypeCdMeaning']);
        newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.userTypeCd)'), 'userTypeCdDisplay']);
        newColumnsToReturn.push('userId', 'email', 'pwd', 'lastName', 'firstName', 'lastLoginDate', 'lastIP', 'primaryPhone', 'cellPhone', 'state', 'zip', 'emailVerifyGUID', 'emailVerifyExpire', 'timeZoneId', 'lastActiveDateTime', 'profilePictureURL', 'profilePictureLocal', 'created', 'updated', 'deletedAt', 'bksTestColumn');
        includes.push('posts');
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'userId':
                case 'email':
                case 'pwd':
                case 'lastName':
                case 'firstName':
                case 'statusCd':
                case 'userTypeCd':
                case 'lastLoginDate':
                case 'lastIP':
                case 'primaryPhone':
                case 'cellPhone':
                case 'state':
                case 'zip':
                case 'emailVerifyGUID':
                case 'emailVerifyExpire':
                case 'timeZoneId':
                case 'lastActiveDateTime':
                case 'profilePictureURL':
                case 'profilePictureLocal':
                case 'created':
                case 'updated':
                case 'deletedAt':
                case 'bksTestColumn':
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                case 'statusCdMeaning':
                    newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.statusCd)'), 'statusCdMeaning']);
                    break;
                case 'statusCdDisplay':
                    newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.statusCd)'), 'statusCdDisplay']);
                    break;
                case 'userTypeCdMeaning':
                    newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.userTypeCd)'), 'userTypeCdMeaning']);
                    break;
                case 'userTypeCdDisplay':
                    newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.userTypeCd)'), 'userTypeCdDisplay']);
                    break;
                case 'posts':
                    includes.push(request.columnsToReturn[i]);
                    break;
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'lastName':
                                case 'emailVerifyGUID':
                                
                if(request[key] > '') whereRequest[key] = request[key];
                break;
        }
    }

    return new Promise((resolve, reject) => {
        if(!request.pageSize) request.pageSize = 100;
        if(!request.page) request.page = 1;
        let findRequest = {
            attributes: newColumnsToReturn,
            limit: Number(request.pageSize),
            offset:((Number(request.page) - 1)*Number(request.pageSize))
        };
        if(includes.length > 0) findRequest['includes'] = includes;
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        User.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteUserFunction(request) {
    return new Promise((resolve, reject) => {
        User.destroy({
            where: {
                userId: request.userId
            }
        })
        .then(dbData => {
            resolve({status: 'SUCCESS', reply:dbData});
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err});
        })
    });
}

function putUserFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'userId':
                                case 'email':
                                case 'pwd':
                                case 'lastName':
                                case 'firstName':
                                case 'lastLoginDate':
                                case 'lastIP':
                                case 'primaryPhone':
                                case 'cellPhone':
                                case 'state':
                                case 'zip':
                                case 'emailVerifyGUID':
                                case 'emailVerifyExpire':
                                case 'timeZoneId':
                                case 'lastActiveDateTime':
                                case 'profilePictureURL':
                                case 'profilePictureLocal':
                                case 'created':
                                case 'updated':
                                case 'deletedAt':
                                case 'bksTestColumn':
                                
                newRequest[key] = request[key];
                break;
                case 'statusCdMeaning':
                                newRequest['statusCd'] = sequelize.literal(` (select referenceCd from reference where referenceMeaning = '${request[key]}' and referenceSet = 'INSERT_REFERENCE_SET_HERE') `);
                                break;
                    case 'userTypeCdMeaning':
                                newRequest['userTypeCd'] = sequelize.literal(` (select referenceCd from reference where referenceMeaning = '${request[key]}' and referenceSet = 'INSERT_REFERENCE_SET_HERE') `);
                                break;
                    
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.userId) {
            User.update(newRequest, {
                where: {
                    userId: request.userId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            User.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getUserFunction, deleteUserFunction, putUserFunction };
