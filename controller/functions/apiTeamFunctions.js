const { ApiTeam } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

--------------------------------------------------------------------------------------------------------------------------------
*/

function getApiTeamFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('apiTeamId', 'name', 'eliminatedInd', 'logoUrl', 'createdAt', 'updatedAt', 'deletedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'apiTeamId':
                        case 'name':
                        case 'eliminatedInd':
                        case 'logoUrl':
                        case 'createdAt':
                        case 'updatedAt':
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
            case 'apiTeamId':
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
        ApiTeam.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteApiTeamFunction(request) {
    return new Promise((resolve, reject) => {
        ApiTeam.destroy({
            where: {
                apiTeamId: request.apiTeamId
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

function putApiTeamFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'apiTeamId':
                                case 'name':
                                case 'eliminatedInd':
                                case 'logoUrl':
                                case 'createdAt':
                                case 'updatedAt':
                                case 'deletedAt':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.apiTeamId) {
            ApiTeam.update(newRequest, {
                where: {
                    apiTeamId: request.apiTeamId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            ApiTeam.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

function seedApiTeamFunction(request) {
    return new Promise((resolve, reject) => {
        const selectQuery = `SELECT distinct teamId, teamName from (
            select homeApiId teamId, homeTeamName teamName from event
            union all
            select awayApiId teamId, awayTeamName teamName from event
        ) dt order by teamId`;
        const reply = sequelize.query(selectQuery);
        resolve(reply);
    });
}

module.exports = { getApiTeamFunction, deleteApiTeamFunction, putApiTeamFunction, seedApiTeamFunction };
