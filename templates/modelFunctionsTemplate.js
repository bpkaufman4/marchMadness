const sequelize = require('../config/connection');
const fs = require('fs');
const { QueryTypes } = require('sequelize');
const generateRoutesFile = require('./routes-template');

function createModelFile(request) {
    let primaryKey;
    sequelize.query('select database() table_schema')
    .then(([tableSchema, metadata]) => {
        sequelize.query(
            `select column_name, column_key, column_default, data_type, is_nullable 
            from information_schema.columns 
            where table_schema = ? and  table_name = ?
            order by ordinal_position`, 
            {
                replacements: [tableSchema[0].table_schema, request.tableName],
                type: QueryTypes.SELECT
            }
        ).then(tableColumns => {
            sequelize.query(
                `select column_name, referenced_table_name
                from information_schema.KEY_COLUMN_USAGE 
                where table_schema = ? and table_name = ? and referenced_table_name is not NULL
                order by ordinal_position;`, 
                {
                    replacements: [tableSchema[0].table_schema, request.tableName],
                    type: QueryTypes.SELECT
                }
            ).then(foreignKeys => {
                let associations = '';
                console.log(foreignKeys);
                foreignKeys.forEach(fk => {
                    associations+= `
                    ${request.tableName.charAt(0).toUpperCase() + request.tableName.slice(1)}.belongsTo(${fk.REFERENCED_TABLE_NAME.charAt(0).toUpperCase() + fk.REFERENCED_TABLE_NAME.slice(1)}, {foreignKey: '${fk.COLUMN_NAME}', as: '${fk.COLUMN_NAME.substring(0, (fk.COLUMN_NAME.length - 2))}'});`
                })
                let functionRequest = {};
                console.log(tableColumns);
                let getSwitch = '';
                let whereSwitch = '';
                let putSwitch = '';
                let referenceGetSwitch = '';
                let referencePutSwitch = '';
                let allColumnsSection = '';
                let allPhysicalColumns = [];
                let modelDocRequest = {
                    get: [],
                    put: [],
                    delete: [],
                    tableName: request.tableName
                };
                let tableName = request.tableName;
                tableColumns.forEach(column => {
                    getSwitch += `case '${column.COLUMN_NAME}':
                    `;
                    if(column.COLUMN_NAME.slice(-2) === 'Cd' && column.COLUMN_KEY != 'PRI'){
    
                        referenceGetSwitch += `case '${column.COLUMN_NAME}Meaning':
                        newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = ${request.tableName}.${column.COLUMN_NAME})'), '${column.COLUMN_NAME}Meaning']);
                        break;
                    case '${column.COLUMN_NAME}Display':
                        newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = ${request.tableName}.${column.COLUMN_NAME})'), '${column.COLUMN_NAME}Display']);
                        break;
            `;
    
                        allColumnsSection += `newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = ${request.tableName}.${column.COLUMN_NAME})'), '${column.COLUMN_NAME}Meaning']);
                        newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = ${request.tableName}.${column.COLUMN_NAME})'), '${column.COLUMN_NAME}Display']);
            `;
    
                        referencePutSwitch += `case '${column.COLUMN_NAME}Meaning':
                            newRequest['${column.COLUMN_NAME}'] = sequelize.literal(\` (select referenceCd from reference where referenceMeaning = '\${request[key]}' and referenceSet = 'INSERT_REFERENCE_SET_HERE') \`);
                            break;
                `
                        modelDocRequest.put.push(column.COLUMN_NAME, column.COLUMN_NAME+'Meaning');
                    } else {
                        if(column.COLUMN_KEY > '') {
                            if(column.COLUMN_KEY === 'PRI') {
                                primaryKey = column.COLUMN_NAME;
                                modelDocRequest.delete.push(column.COLUMN_NAME);
                                modelDocRequest.primaryKey = column.COLUMN_NAME;
                            }
                            if(column.COLUMN_KEY === 'MUL')
                            whereSwitch += `case '${column.COLUMN_NAME}':
                            `;
                            modelDocRequest.get.push(column.COLUMN_NAME);
                            putSwitch += `case '${column.COLUMN_NAME}':
                            `
                        } else {
                            putSwitch += `case '${column.COLUMN_NAME}':
                            `
                        }
                        allPhysicalColumns.push(column.COLUMN_NAME);
                        modelDocRequest.put.push(column.COLUMN_NAME);
                    }
                })
                allColumnsSection += `newColumnsToReturn.push('${allPhysicalColumns.join("', '")}')
                `;
                functionRequest = {getSwitch, whereSwitch, putSwitch, tableName, primaryKey, referenceGetSwitch, referencePutSwitch, allColumnsSection, associations};
                if(request.createFunctionsFile == '1') {
                    const fileContents = generateFunctionsFile(functionRequest);
                    const fileName = `controller/functions/${request.tableName}Functions.js`
                    fs.writeFile(fileName, fileContents, function (err) {
                        console.log('success');
                    });
                }
                
                if(request.createRoutesFile == '1') {
                    const directory = `controller/api/${request.tableName}-routes`;
                    const contents = generateRoutesFile(modelDocRequest);
                    if(!fs.existsSync(directory)) {
                        fs.mkdirSync(directory);
                    }

                    fs.writeFile(`${directory}/get.js`, contents.get, function (err) {
                        console.log(`get ${request.tableName} success`);
                    });
                    fs.writeFile(`${directory}/put.js`, contents.put, function (err) {
                        console.log(`put ${request.tableName} success`);
                    });
                    fs.writeFile(`${directory}/delete.js`, contents.delete, function (err) {
                        console.log(`delete ${request.tableName} success`);
                    });
                    fs.writeFile(`${directory}/index.js`, contents.index, function (err) {
                        console.log(`index ${request.tableName} success`);
                    });
                }
                return({message: 'success'});
            })
        })
    })
}

function generateFunctionsFile(request) {
    const snakeCase = request.tableName.charAt(0).toUpperCase() + request.tableName.slice(1);
    return `const { ${snakeCase} } = require('../../models');
const sequelize = require('../../config/connection');

/*
-------- Paste into models/index.js (these may not be perfect, but change them and remove duplicates if they are weird) --------
${request.associations}
--------------------------------------------------------------------------------------------------------------------------------
*/

function get${snakeCase}Function(request) {
    let newColumnsToReturn = [];
    if(!request.columnsToReturn || request.columnsToReturn.length == 0) {
        ${request.allColumnsSection}
    } else {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                ${request.getSwitch}
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
                ${request.referenceGetSwitch}
            }
        }
    }

    let whereRequest = {};
    let binds = {};

    for(key in request) {
        switch(key) {
            ${request.whereSwitch}
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
        ${snakeCase}.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
        })
        .catch(err => {
            resolve({status: 'FAIL'})
        })
    })
}

function delete${snakeCase}Function(request) {
    return new Promise((resolve, reject) => {
        ${snakeCase}.destroy({
            where: {
                ${request.primaryKey}: request.${request.primaryKey}
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

function put${snakeCase}Function(request) {
    let newRequest = {};
    let binds = {};
    for(const key in request) {
        if(request[key] > '') {
            switch(key) {
                ${request.putSwitch}
                newRequest[key] = request[key];
                break;
                ${request.referencePutSwitch}
            }
        }
    }
    return new Promise((resolve, reject) => {
        if(request.${request.primaryKey}) {
            ${snakeCase}.update(newRequest, {
                where: {
                    ${request.primaryKey}: request.${request.primaryKey}
                }
            })
            .then(dbData => {
                resolve(dbData);
            })
            .catch(err => {
                resolve({status: 'FAIL'});
            });
        } else {
            ${snakeCase}.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            })
            .catch(err => {
                resolve({status: 'FAIL'});
            });
        }
    })
}

module.exports = { get${snakeCase}Function, delete${snakeCase}Function, put${snakeCase}Function };
`
}

module.exports = createModelFile, generateFunctionsFile;