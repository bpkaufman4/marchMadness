const { IpLogging } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

                        IpLogging.belongsTo(User, {foreignKey: 'userId', as: 'user'});
--------------------------------------------------------------------------------------------------------------------------------
*/

function getIpLoggingFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('ipLoggingId', 'script_name', 'request_uri', 'query_string', 'request', 'remote_addr', 'http_x_real_ip', 'userId', 'created', 'updated', 'deletedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'ipLoggingId':
                        case 'script_name':
                        case 'request_uri':
                        case 'query_string':
                        case 'request':
                        case 'remote_addr':
                        case 'http_x_real_ip':
                        case 'userId':
                        case 'created':
                        case 'updated':
                        case 'deletedAt':
                        
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'script_name':
                                case 'remote_addr':
                                case 'http_x_real_ip':
                                case 'userId':
                                case 'created':
                                
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
        if(includes.length > 0) findRequest['include'] = includes;
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        IpLogging.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteIpLoggingFunction(request) {
    return new Promise((resolve, reject) => {
        IpLogging.destroy({
            where: {
                ipLoggingId: request.ipLoggingId
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

function putIpLoggingFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'ipLoggingId':
                                case 'script_name':
                                case 'request_uri':
                                case 'query_string':
                                case 'request':
                                case 'remote_addr':
                                case 'http_x_real_ip':
                                case 'userId':
                                case 'created':
                                case 'updated':
                                case 'deletedAt':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.ipLoggingId) {
            IpLogging.update(newRequest, {
                where: {
                    ipLoggingId: request.ipLoggingId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            IpLogging.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getIpLoggingFunction, deleteIpLoggingFunction, putIpLoggingFunction };
