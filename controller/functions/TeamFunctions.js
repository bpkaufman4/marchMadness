const { Team } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

                        Team.belongsTo(User, {foreignKey: 'ownerId', as: 'owner'});
                        Team.belongsTo(League, {foreignKey: 'leagueId', as: 'league'});
--------------------------------------------------------------------------------------------------------------------------------
*/

function getTeamFunction(request) {
    let newColumnsToReturn = [];
    let includes = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('teamId', 'name', 'ownerId', 'leagueId', 'createdAt', 'updatedAt', 'deletedAt')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'teamId':
                case 'name':
                case 'ownerId':
                case 'leagueId':
                case 'createdAt':
                case 'updatedAt':
                case 'deletedAt':
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                case 'owner':
                case 'league':
                case 'players':
                    includes.push(request.columnsToReturn[i]);
                    break;
                case 'points':
                    newColumnsToReturn.push([sequelize.literal(`(select sum(s.points) from statistic s where s.PlayerId in (select playerPlayerId from playerTeam where teamTeamId = team.teamId))`), 'points']);
                    break;
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'ownerId':
            case 'leagueId':
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
        if(request.orderBy > '') findRequest.order = request.orderBy;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        Team.findAll(findRequest)
        .then(dbData => {
            console.log(dbData);
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            console.log(err);
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteTeamFunction(request) {
    return new Promise((resolve, reject) => {
        Team.destroy({
            where: {
                teamId: request.teamId
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

function putTeamFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'teamId':
                case 'name':
                case 'ownerId':
                case 'leagueId':
                case 'createdAt':
                case 'updatedAt':
                case 'deletedAt':
                    newRequest[key] = request[key];
                    break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.teamId) {
            Team.update(newRequest, {
                where: {
                    teamId: request.teamId
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            Team.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                console.log(err);
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getTeamFunction, deleteTeamFunction, putTeamFunction };
