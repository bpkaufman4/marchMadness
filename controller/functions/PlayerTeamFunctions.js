const { PlayerTeam } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

                        PlayerTeam.belongsTo(Player, {foreignKey: 'playerId', as: 'player'});
                        PlayerTeam.belongsTo(Team, {foreignKey: 'teamId', as: 'team'});
--------------------------------------------------------------------------------------------------------------------------------
*/

function getPlayerTeamFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('playerTeamId', 'playerId', 'teamId', 'createdAt', 'updatedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'playerTeamId':
                        case 'playerId':
                        case 'teamId':
                        case 'createdAt':
                        case 'updatedAt':
                        
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'playerId':
                                case 'teamId':
                                
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
        PlayerTeam.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deletePlayerTeamFunction(request) {
    return new Promise((resolve, reject) => {
        PlayerTeam.destroy({
            where: {
                playerTeamId: request.playerTeamId
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

function putPlayerTeamFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'playerTeamId':
                                case 'playerId':
                                case 'teamId':
                                case 'createdAt':
                                case 'updatedAt':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.playerTeamId) {
            PlayerTeam.update(newRequest, {
                where: {
                    playerTeamId: request.playerTeamId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            PlayerTeam.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getPlayerTeamFunction, deletePlayerTeamFunction, putPlayerTeamFunction };
