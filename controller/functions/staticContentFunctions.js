const { StaticContent } = require('../../models');
const sequelize = require('../../config/connection');

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
            case 'contentType':
                        
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
            resolve(dbData)
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
            resolve(dbData);
        })
    });
}

function putStaticContentFunction(request) {
    let newRequest = {};
    for(const key in request) {
        if(request.key == '') continue;
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
    return new Promise((resolve, reject) => {
        if(request.contentType) {
            StaticContent.update(newRequest, {
                where: {
                    contentType: request.contentType
                }
            })
            .then(dbData => {
                resolve(dbData);
            });
        } else {
            StaticContent.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            });
        }
    })
}

module.exports = { getStaticContentFunction, deleteStaticContentFunction, putStaticContentFunction };
