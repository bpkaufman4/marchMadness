const { ReferenceSet } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

--------------------------------------------------------------------------------------------------------------------------------
*/

function getReferenceSetFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            
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
        ReferenceSet.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteReferenceSetFunction(request) {
    return new Promise((resolve, reject) => {
        ReferenceSet.destroy({
            where: {
                undefined: request.undefined
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

function putReferenceSetFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.undefined) {
            ReferenceSet.update(newRequest, {
                where: {
                    undefined: request.undefined
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            ReferenceSet.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getReferenceSetFunction, deleteReferenceSetFunction, putReferenceSetFunction };
