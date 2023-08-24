const { ChangeLog } = require('../../models');
const sequelize = require('../../config/connection');

function getChangeLogFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('changeLogId', 'changeDetails', 'changeDateTime', 'userId', 'parentId', 'parentName', 'templateType', 'created', 'updated')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'changeLogId':
                        case 'changeDetails':
                        case 'changeDateTime':
                        case 'userId':
                        case 'parentId':
                        case 'parentName':
                        case 'templateType':
                        case 'created':
                        case 'updated':
                        
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'userId':
                                
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
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        ChangeLog.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteChangeLogFunction(request) {
    return new Promise((resolve, reject) => {
        ChangeLog.destroy({
            where: {
                changeLogId: request.changeLogId
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

function putChangeLogFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'changeLogId':
                                case 'changeDetails':
                                case 'changeDateTime':
                                case 'userId':
                                case 'parentId':
                                case 'parentName':
                                case 'templateType':
                                case 'created':
                                case 'updated':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.changeLogId) {
            ChangeLog.update(newRequest, {
                where: {
                    changeLogId: request.changeLogId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            ChangeLog.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getChangeLogFunction, deleteChangeLogFunction, putChangeLogFunction };
