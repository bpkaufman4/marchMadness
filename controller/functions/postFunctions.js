const { Post } = require('../../models');
const sequelize = require('../../config/connection');

function getPostFunction(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        newColumnsToReturn.push('postId', 'userId', 'content', 'created', 'updated', 'deletedAt')
                
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'postId':
                    case 'userId':
                    case 'content':
                    case 'created':
                    case 'updated':
                    case 'deletedAt':
                    
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            case 'userId':
                            
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
        Post.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
        })
        .catch(err => {
            resolve({status: 'FAIL'})
        })
    })
}

function deletePostFunction(request) {
    return new Promise((resolve, reject) => {
        Post.destroy({
            where: {
                postId: request.postId
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

function putPostFunction(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                case 'postId':
                            case 'userId':
                            case 'content':
                            case 'created':
                            case 'updated':
                            case 'deletedAt':
                            
                newRequest[key] = request[key];
                break;
                
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.postId) {
            Post.update(newRequest, {
                where: {
                    postId: request.postId
                }
            })
            .then(dbData => {
                resolve(dbData);
            })
            .catch(err => {
                resolve({status: 'FAIL'});
            });
        } else {
            Post.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            })
            .catch(err => {
                resolve({status: 'FAIL'});
            });
        }
    })
}

module.exports = { getPostFunction, deletePostFunction, putPostFunction };
