const { PlayerTeam } = require('../../models');
const sequelize = require('../../config/connection');

function getPlayerTeamFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('playerTeamId', 'PlayerID', 'teamId', 'createdAt', 'updatedAt')
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'playerTeamId':
                case 'PlayerID':
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
            case 'PlayerID':
            case 'teamId':
            case 'playerTeamId':                    
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
    console.log(request);
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'playerTeamId':
                case 'playerPlayerID':
                case 'teamTeamId':
                case 'createdAt':
                case 'updatedAt':
                    newRequest[key] = request[key];
                    break;
            }
        }
    }
    return new Promise((resolve, reject) => {
        PlayerTeam.upsert(newRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply:dbData});
        })
        .catch(err => {
            resolve({status: 'FAIL', reply:err});
        });
    })
}

module.exports = { getPlayerTeamFunction, deletePlayerTeamFunction, putPlayerTeamFunction };
