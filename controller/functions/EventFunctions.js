const { Event } = require('../../models');
const sequelize = require('../../config/connection');

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
                        case 'apiEventId':
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
            case 'apiEventId':
                if(request[key] > '') whereRequest[key] = request[key];
                break;
        }
    }

    return new Promise((resolve, reject) => {
        let findRequest = {
            attributes: newColumnsToReturn,
        };
        if(request.pageSize) findRequest.limit = Number(request.pageSize);
        if(request.offset) findRequest.offset = ((Number(request.page) - 1)*Number(request.pageSize));

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

function bulkCreateEventFunction(request) {
    return new Promise((resolve, reject) => {
        Event.bulkCreate(request.events);
        resolve(request);
    })
}

module.exports = { getEventFunction, deleteEventFunction, putEventFunction, bulkCreateEventFunction };
