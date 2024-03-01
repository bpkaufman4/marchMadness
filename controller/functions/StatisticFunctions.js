const { Statistic } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

                        Statistic.belongsTo(Player, {foreignKey: 'PlayerID', as: 'Player'});
                        Statistic.belongsTo(Event, {foreignKey: 'GameID', as: 'Game'});
--------------------------------------------------------------------------------------------------------------------------------
*/

function getStatisticFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('StatID', 'PlayerID', 'Points', 'GameID', 'createdAt', 'updatedAt', 'deletedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'StatID':
                        case 'PlayerID':
                        case 'Points':
                        case 'GameID':
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
            case 'PlayerID':
                                case 'GameID':
                                
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
        Statistic.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteStatisticFunction(request) {
    return new Promise((resolve, reject) => {
        Statistic.destroy({
            where: {
                StatID: request.StatID
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

function putStatisticFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'StatID':
                case 'PlayerID':
                case 'Points':
                case 'GameID':
                case 'createdAt':
                case 'updatedAt':
                case 'deletedAt':
                    newRequest[key] = request[key];
                    break;
            }
        }
    }
    return new Promise((resolve, reject) => {
        Statistic.upsert(newRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply:dbData});
        })
        .catch(err => {
            resolve({status: 'FAIL', reply:err});
        });
    })
}

module.exports = { getStatisticFunction, deleteStatisticFunction, putStatisticFunction };
