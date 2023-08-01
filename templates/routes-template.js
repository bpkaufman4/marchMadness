function generateRoutesFile(request) {
    const snakeCase = request.tableName.charAt(0).toUpperCase() + request.tableName.slice(1);
    return `
const router = require('express').Router();
const { put${snakeCase}Function, get${snakeCase}Function, delete${snakeCase}Function } = require('../functions/${request.tableName}Functions');

router.get('/get${snakeCase}', (req, res) => {
    const requestFields = ['${request.get.join("', '")}'];
    const endpoint = '${request.tableName}/get${snakeCase}';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/put${snakeCase}', (req, res) => {
    const requestFields = ['${request.put.join("', '")}'];
    const endpoint = '${request.tableName}/put${snakeCase}';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/delete${snakeCase}', (req, res) => {
    const requestFields = ['${request.delete.join("', '")}'];
    const endpoint = '${request.tableName}/delete${snakeCase}';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/get${snakeCase}', (req, res) => {
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

module.exports = router;
    `
}


module.exports = generateRoutesFile;