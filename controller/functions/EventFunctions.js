const { Event } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

                        Event.belongsTo(Apiteam, {foreignKey: 'AwayTeamID', as: 'AwayTeam'});
                        Event.belongsTo(Apiteam, {foreignKey: 'HomeTeamID', as: 'HomeTeam'});
--------------------------------------------------------------------------------------------------------------------------------
*/

function getEventFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('GameID', 'Status', 'DateTime', 'AwayTeamID', 'HomeTeamID', 'createdAt', 'updatedAt', 'deletedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'GameID':
                case 'Status':
                case 'DateTime':
                case 'AwayTeamID':
                case 'HomeTeamID':
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
            case 'GameID':
            case 'AwayTeamID':
            case 'HomeTeamID':                                
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
                GameID: request.GameID
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
                case 'GameID':
                case 'Status':
                case 'DateTime':
                case 'AwayTeamID':
                case 'HomeTeamID':
                case 'createdAt':
                case 'updatedAt':
                case 'deletedAt':
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        Event.upsert(newRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply:dbData});
        })
        .catch(err => {
            resolve({status: 'FAIL', reply:err});
        });
    })
}

module.exports = { getEventFunction, deleteEventFunction, putEventFunction };
