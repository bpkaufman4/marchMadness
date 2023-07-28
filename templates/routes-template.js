function generateRoutesFile(table) {
    const snakeCase = table.charAt(0).toUpperCase() + table.slice(1);
    return `
        const router = require('express').Router();
        const { put${snakeCase}Function, get${snakeCase}Function, delete${snakeCase}Function } = require('../functions/${table}Functions');
        
        
        router.post('/get${snakeCase}', (req, res) => {
            console.log(req.ip);
            let request = req.body;
        
            get${snakeCase}Function(request)
            .then(returnValue => {
                res.json(returnValue)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        });
        
        router.post('/put${snakeCase}', (req, res) => {
            const request = req.body;
            put${snakeCase}Function(request)
            .then(returnValue => {
                res.json(returnValue);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        });
        
        router.post('/delete${snakeCase}', (req, res) => {
            const request = req.body;
            delete${snakeCase}Function(request)
            .then(returnValue => {
                res.json(returnValue);
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        });
    `
}


module.exports = generateRoutesFile;