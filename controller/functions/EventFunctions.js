const { Event } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

--------------------------------------------------------------------------------------------------------------------------------
*/

function getEventFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('eventId', 'apiEventId', 'homeApiId', 'awayApiId', 'startDate', 'homeScore', 'awayScore', 'homeTeamName', 'awayTeamName', 'homeTeamLogoUrl', 'awayTeamLogoUrl', 'createdAt', 'updatedAt', 'deletedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'eventId':
                        case 'apiEventId':
                        case 'homeApiId':
                        case 'awayApiId':
                        case 'startDate':
                        case 'homeScore':
                        case 'awayScore':
                        case 'homeTeamName':
                        case 'awayTeamName':
                        case 'homeTeamLogoUrl':
                        case 'awayTeamLogoUrl':
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
            case 'eventId':
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
        Event.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteEventFunction(request) {
    return new Promise((resolve, reject) => {
        Event.destroy({
            where: {
                eventId: request.eventId
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

function putEventFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'eventId':
                                case 'apiEventId':
                                case 'homeApiId':
                                case 'awayApiId':
                                case 'startDate':
                                case 'homeScore':
                                case 'awayScore':
                                case 'homeTeamName':
                                case 'awayTeamName':
                                case 'homeTeamLogoUrl':
                                case 'awayTeamLogoUrl':
                                case 'createdAt':
                                case 'updatedAt':
                                case 'deletedAt':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.eventId) {
            Event.update(newRequest, {
                where: {
                    eventId: request.eventId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            Event.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getEventFunction, deleteEventFunction, putEventFunction };
