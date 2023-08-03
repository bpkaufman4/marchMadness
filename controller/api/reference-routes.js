
const router = require('express').Router();
const { putReferenceFunction, getReferenceFunction, deleteReferenceFunction } = require('../functions/referenceFunctions');

router.get('/get', (req, res) => {
    const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning'];
    const endpoint = 'reference/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/put', (req, res) => {
    const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning', 'display', 'description', 'activeInd', 'created', 'updated'];
    const endpoint = 'reference/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/delete', (req, res) => {
    const requestFields = ['referenceCd'];
    const endpoint = 'reference/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/get', (req, res) => {
    let request = req.body;

    getReferenceFunction(request)
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
    putReferenceFunction(request)
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
    deleteReferenceFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
    