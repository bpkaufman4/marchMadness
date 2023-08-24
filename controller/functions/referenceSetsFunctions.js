const { ReferenceSets } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

--------------------------------------------------------------------------------------------------------------------------------
*/

function getReferenceSetsFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('referenceSet', 'display', 'description', 'deletableInd', 'created')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'referenceSet':
                        case 'display':
                        case 'description':
                        case 'deletableInd':
                        case 'created':
                        
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            
                // if(request[key] > '') whereRequest[key] = request[key];
                // break;
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
        ReferenceSets.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteReferenceSetsFunction(request) {
    return new Promise((resolve, reject) => {
        ReferenceSets.destroy({
            where: {
                referenceSet: request.referenceSet
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

function putReferenceSetsFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'referenceSet':
                                case 'display':
                                case 'description':
                                case 'deletableInd':
                                case 'created':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.referenceSet) {
            ReferenceSets.update(newRequest, {
                where: {
                    referenceSet: request.referenceSet
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            ReferenceSets.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getReferenceSetsFunction, deleteReferenceSetsFunction, putReferenceSetsFunction };
