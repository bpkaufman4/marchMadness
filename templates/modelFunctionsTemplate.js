const sequelize = require('../config/connection');
const fs = require('fs');
const { QueryTypes } = require('sequelize');

function createModelFunctionsFile(request) {
    let primaryKey;
    sequelize.query('select database() table_schema')
    .then(([tableSchema, metadata]) => {
        console.log(tableSchema);
        console.log(request);
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
            let functionRequest = {};
            console.log(tableColumns);
            let getSwitch = '';
            let whereSwitch = '';
            let putSwitch = '';
            let referenceGetSwitch = '';
            let referencePutSwitch = '';
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
                    referencePutSwitch += `case '${column.COLUMN_NAME}Meaning':
                        whereRequest['${column.COLUMN_NAME}'] = sequelize.literal(\` (select referenceCd from reference where referenceMeaning = $\${key} and referenceSet = 'INSERT_REFERENCE_SET_HERE') = ${request.tableName}.${column.COLUMN_NAME} \`);
                        binds[key] = request[key];
                        break;
                        `
                } else {
                    if(column.COLUMN_KEY > '') {
                        if(column.COLUMN_KEY === 'PRI') {
                            primaryKey = column.COLUMN_NAME
                        }
                        whereSwitch += `case '${column.COLUMN_NAME}':
                        `;    
                    } else {
                        putSwitch += `case '${column.COLUMN_NAME}':
                        `
                    }
                }
            })
            functionRequest = {getSwitch, whereSwitch, putSwitch, tableName, primaryKey, referenceGetSwitch, referencePutSwitch};
            const fileContents = generateModelFunctionsFile(functionRequest);
            const fileName = `controller/functions/${request.tableName}Functions.js`
            fs.appendFile(fileName, fileContents, function (err) {
                return {message: 'Success'};
            })
        });
    })
}

function generateModelFunctionsFile(request) {
    const snakeCase = request.tableName.charAt(0).toUpperCase() + request.tableName.slice(1);
    return `const { ${snakeCase} } = require('../../models');
const sequelize = require('../../config/connection');

function get${snakeCase}Function(request) {
    let newColumnsToReturn = [];
    if(request.columnsToReturn.length > 0) {
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
        ${snakeCase}.findAll(findRequest)
        .then(dbData => {
            resolve(dbData)
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
    });
}

function put${snakeCase}Function(request) {
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            ${request.putSwitch}
            newRequest[key] = request[key];
            break;
            ${request.referencePutSwitch}
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
            });
        } else {
            ${snakeCase}.create(newRequest)
            .then(dbData => {
                resolve(dbData);
            });
        }
    })
}

module.exports = { get${snakeCase}Function, delete${snakeCase}Function, put${snakeCase}Function };
`
}

module.exports = createModelFunctionsFile;