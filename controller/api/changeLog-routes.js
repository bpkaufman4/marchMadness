
const router = require('express').Router();
const basepath = require('../index');
const { putChangeLogFunction, getChangeLogFunction, deleteChangeLogFunction } = require('../functions/changeLogFunctions');

router.get('/get', (req, res) => {
    const requestFields = ['changeLogId', 'userId'];
    const endpoint = 'changeLog/get';
    const layout = 'admin';
    const renderData = {requestFields, endpoint, layout, basepath};

    res.render('modelFileExercisor', renderData);
});

router.get('/put', (req, res) => {
    const requestFields = ['changeLogId', 'changeDetails', 'changeDateTime', 'userId', 'parentId', 'parentName', 'templateType', 'created', 'updated'];
    const endpoint = 'changeLog/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/delete', (req, res) => {
    const requestFields = ['changeLogId'];
    const endpoint = 'changeLog/delete';
    const renderData = {requestFields, endpoint, basepath};

    res.render('modelFileExercisor', renderData);
})

router.post('/get', (req, res) => {
    let request = req.body;

    getChangeLogFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/put', (req, res) => {
    const request = req.body;
    putChangeLogFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/delete', (req, res) => {
    const request = req.body;
    deleteChangeLogFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
    