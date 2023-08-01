
const router = require('express').Router();
const { putChangeLogFunction, getChangeLogFunction, deleteChangeLogFunction } = require('../functions/changeLogFunctions');

router.get('/getChangeLog', (req, res) => {
    const requestFields = ['changeLogId', 'userId'];
    const endpoint = 'changeLog/getChangeLog';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/putChangeLog', (req, res) => {
    const requestFields = ['changeLogId', 'changeDetails', 'changeDateTime', 'userId', 'parentId', 'parentName', 'templateType', 'created', 'updated'];
    const endpoint = 'changeLog/putChangeLog';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/deleteChangeLog', (req, res) => {
    const requestFields = ['changeLogId'];
    const endpoint = 'changeLog/deleteChangeLog';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/getChangeLog', (req, res) => {
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

router.post('/putChangeLog', (req, res) => {
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

router.post('/deleteChangeLog', (req, res) => {
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
    