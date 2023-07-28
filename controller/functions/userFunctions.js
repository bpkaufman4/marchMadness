
const { User } = require('../../models');
const sequelize = require('../../config/connection');

function getUserFunction(request) {
    let newColumnsToReturn = [];
    if(request.columnsToReturn.length > 0) {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'userId':
                case 'email':
                case 'lastName':
                case 'firstName':
                case 'fullName':
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
                case 'timezoneId':
                case 'lastActiveDateTime':
                case 'profilePictureURL':
                case 'profilePictureLocal':
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
                whereRequest[key] = request[key];
                break;
            case 'statusCdMeaning':
                whereRequest['statusCd'] = sequelize.literal(` (select referenceCd from reference where referenceMeaning = $${key} and referenceSet = 'USERSTATUS') = user.statusCd `);
                binds[key] = request[key];
                break;
            case 'userTypeCdMeaning':
                whereRequest['statusCd'] = sequelize.literal(` (select referenceCd from reference where referenceMeaning = $${key} and referenceSet = 'USERTYPE') = user.userTypeCd `);
                binds[key] = request[key];
                break;
        }
    }

    return new Promise((resolve, reject) => {
        let findRequest = {
            attributes: newColumnsToReturn,
            limit: Number(request.pageSize),
            offset:((Number(request.page) - 1)*Number(request.pageSize))
        };
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        User.findAll(findRequest)
        .then(dbUserData => {
            resolve(dbUserData)
        })
    })
}

// delete user
function deleteUserFunction(request) {
    return new Promise((resolve, reject) => {
        User.destroy({
            where: {
                userId: request.userId
            }
        })
        .then(dbUserData => {
            resolve(dbUserData);
        })
    });
}

// put user
function putUserFunction(request) {
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            case 'email':
            case 'lastName':
            case 'firstName':
            case 'pwd':
                newRequest[key] = request[key];
                break;
            case 'statusCdMeaning':
                newRequest['statusCd'] = sequelize.literal("(select referenceCd from reference where referenceMeaning = '"+request[key]+"' and referenceSet = 'USERSTATUS')");
                console.log(newRequest['statusCd']);
                break;  
            case 'userTypeCdMeaning':
                newRequest['userTypeCd'] = sequelize.literal("(select referenceCd from reference where referenceMeaning = '"+request[key]+"' and referenceSet = 'USERTYPE')");
                console.log(newRequest['userTypeCd']);
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
            .then(dbUserData => {
                resolve(dbUserData);
            });
        } else {
            User.create(newRequest)
            .then(dbUserData => {
                resolve(dbUserData);
            });
        }
    })
}

module.exports = { getUserFunction, putUserFunction, deleteUserFunction };