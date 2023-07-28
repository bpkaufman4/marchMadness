const { Reference } = require('../../models');
const sequelize = require('../../config/connection');

function getReferenceFunction(request) {
    let newColumnsToReturn = [];
    if(request.columnsToReturn.length > 0) {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'referenceCd':
                case 'referenceSet':
                case 'referenceMeaning':
                case 'display':
                case 'description':
                case 'activeInd':
                case 'created':
                case 'updated':
                
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'referenceCd':
                        case 'referenceSet':
                        case 'referenceMeaning':
                        
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
        Reference.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
        })
    })
}

function deleteReferenceFunction(request) {
    return new Promise((resolve, reject) => {
        Reference.destroy({
            where: {
                referenceCd: request.referenceCd
            }
        })
        .then(dbData => {
            resolve(dbData);
        })
    });
}

function putReferenceFunction(request) {
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            case 'display':
                        case 'description':
                        case 'activeInd':
                        case 'created':
                        case 'updated':
                        
            newRequest[key] = request[key];
            break;
            
        }
    }
    return new Promise((resolve, reject) => {
        if(request.referenceCd) {
            Reference.update(newRequest, {
                where: {
                    referenceCd: request.referenceCd
                }
            })
            .then(dbData => {
                resolve(dbData);
            });
        } else {
            Reference.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            });
        }
    })
}

module.exports = { getReferenceFunction, deleteReferenceFunction, putReferenceFunction };
