function generateRoutesFile(request) {
    const snakeCase = request.tableName.charAt(0).toUpperCase() + request.tableName.slice(1);
    let returnValue = {};
    returnValue.get = `
const router = require('express').Router();
const { get${snakeCase}Function } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['${request.get.join("', '")}'];
    const endpoint = '${request.tableName}/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
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

module.exports = router;`;

returnValue.put = `
const router = require('express').Router();
const { put${snakeCase}Function } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['${request.put.join("', '")}'];
    const endpoint = '${request.tableName}/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
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

module.exports = router;`;

returnValue.delete = `
const router = require('express').Router();
const { delete${snakeCase}Function } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['${request.delete.join("', '")}'];
    const endpoint = '${request.tableName}/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    delete${snakeCase}Function(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;`

returnValue.index = `const router = require('express').Router();

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

module.exports = router; `

    return returnValue;
}


module.exports = generateRoutesFile;