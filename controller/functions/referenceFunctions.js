const { Reference } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js --------

                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
                    Reference.belongsTo(Referencesets, {foreignKey: 'referenceSet', as: 'referenceS'});
--------------------------------------------
*/

function getReferenceFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('referenceCd', 'referenceSet', 'referenceMeaning', 'display', 'description', 'activeInd', 'created', 'updated')
                
    } else {
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
            case 'referenceSet':
                            case 'referenceMeaning':
                            
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
        if(Object.keys(whereRequest).length > 0) findRequest['where'] = whereRequest;
        if(Object.keys(binds).length > 0) findRequest['bind'] = binds;
        Reference.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
        })
        .catch(err => {
            resolve({status: 'FAIL'})
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
        .catch(err => {
            resolve({status: 'FAIL'})
        })
    });
}

function putReferenceFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'referenceCd':
                            case 'referenceSet':
                            case 'referenceMeaning':
                            case 'display':
                            case 'description':
                            case 'activeInd':
                            case 'created':
                            case 'updated':
                            
                newRequest[key] = request[key];
                break;
                
            }
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
            })
            .catch(err => {
                resolve({status: 'FAIL'});
            });
        } else {
            Reference.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            })
            .catch(err => {
                resolve({status: 'FAIL'});
            });
        }
    })
}

module.exports = { getReferenceFunction, deleteReferenceFunction, putReferenceFunction };
