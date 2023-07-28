const { ReferenceSets } = require('../../models');
const sequelize = require('../../config/connection');

function getReferenceSetsFunction(request) {
    let newColumnsToReturn = [];
    if(request.columnsToReturn.length > 0) {
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
            case 'referenceSet':
                        
                whereRequest[key] = request[key];
                break;
        }
    }

    return new Promise((resolve, reject) => {
        let findRequest = {
            attributes: newColumnsToReturn,
            limit: Number(request.pageSize),
            offset:((Number(request.page) - 1)*Number(request.pageSize))
        };
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        ReferenceSets.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
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
            resolve(dbData);
        })
    });
}

function putReferenceSetsFunction(request) {
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            case 'display':
                        case 'description':
                        case 'deletableInd':
                        case 'created':
                        
            newRequest[key] = request[key];
            break;
            
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
                resolve(dbData);
            });
        } else {
            ReferenceSets.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            });
        }
    })
}

module.exports = { getReferenceSetsFunction, deleteReferenceSetsFunction, putReferenceSetsFunction };
