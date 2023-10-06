const { StaticContent } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------

--------------------------------------------------------------------------------------------------------------------------------
*/

function getStaticContentFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('contentType', 'title', 'permalink', 'content', 'SEOTitle', 'SEOKeywords', 'SEODescription', 'articleData', 'parsedElements', 'created', 'updated')
                    
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'contentType':
                        case 'title':
                        case 'permalink':
                        case 'content':
                        case 'SEOTitle':
                        case 'SEOKeywords':
                        case 'SEODescription':
                        case 'articleData':
                        case 'parsedElements':
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
        StaticContent.findAll(findRequest)
        .then(dbData => {
            resolve({status: 'SUCCESS', reply: dbData})
        })
        .catch(err => {
            resolve({status: 'FAIL', reply: err})
        })
    })
}

function deleteStaticContentFunction(request) {
    return new Promise((resolve, reject) => {
        StaticContent.destroy({
            where: {
                contentType: request.contentType
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

function putStaticContentFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'contentType':
                                case 'title':
                                case 'permalink':
                                case 'content':
                                case 'SEOTitle':
                                case 'SEOKeywords':
                                case 'SEODescription':
                                case 'articleData':
                                case 'parsedElements':
                                case 'created':
                                case 'updated':
                                
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.contentType) {
            StaticContent.update(newRequest, {
                where: {
                    contentType: request.contentType
                }
            })
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply:err});
            });
        } else {
            StaticContent.create(newRequest)
            .then(dbData => {
                resolve({status: 'SUCCESS', reply:dbData});
            })
            .catch(err => {
                resolve({status: 'FAIL', reply: err});
            });
        }
    })
}

module.exports = { getStaticContentFunction, deleteStaticContentFunction, putStaticContentFunction };
