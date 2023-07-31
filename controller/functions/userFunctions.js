const { User } = require('../../models');
const sequelize = require('../../config/connection');

function getUserFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn) {
        newColumnsToReturn.push(sequelize.literal('*'));
        newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.userTypeCd)'), 'userTypeCdMeaning']);
        newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.statusCd)'), 'statusCdMeaning']);
        newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.statusCd)'), 'statusCdDisplay']);
        newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.userTypeCd)'), 'userTypeCdDisplay']);
    }
    if(request.columnsToReturn.length > 0) {
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
                    
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'userId':
            case 'email':
            case 'lastName':
            case 'emailVerifyGUID':
                if(request[key] > '') whereRequest[key] = request[key];
                break;
        }
    }

    return new Promise((resolve, reject) => {
        if(!request.page) request.page = 1;
        if(!request.pageSize) request.pageSize = 100;
        let findRequest = {
            attributes: newColumnsToReturn,
            limit: Number(request.pageSize),
            offset:((Number(request.page) - 1)*Number(request.pageSize))
        };
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        User.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
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
            resolve(dbData);
        })
    });
}

function putUserFunction(request) {
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            case 'pwd':
                        case 'firstName':
                        case 'lastLoginDate':
                        case 'lastIP':
                        case 'primaryPhone':
                        case 'cellPhone':
                        case 'state':
                        case 'zip':
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
                        whereRequest['statusCd'] = sequelize.literal(` (select referenceCd from reference where referenceMeaning = $${key} and referenceSet = 'INSERT_REFERENCE_SET_HERE') = user.statusCd `);
                        binds[key] = request[key];
                        break;
                        case 'userTypeCdMeaning':
                        whereRequest['userTypeCd'] = sequelize.literal(` (select referenceCd from reference where referenceMeaning = $${key} and referenceSet = 'INSERT_REFERENCE_SET_HERE') = user.userTypeCd `);
                        binds[key] = request[key];
                        break;
                        
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
                resolve(dbData);
            });
        } else {
            User.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            });
        }
    })
}

module.exports = { getUserFunction, deleteUserFunction, putUserFunction };
