
const router = require('express').Router();
const { putReferenceFunction, getReferenceFunction, deleteReferenceFunction } = require('../functions/referenceFunctions');

router.get('/getReference', (req, res) => {
    const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning'];
    const endpoint = 'reference/getReference';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/putReference', (req, res) => {
    const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning', 'display', 'description', 'activeInd', 'created', 'updated'];
    const endpoint = 'reference/putReference';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/deleteReference', (req, res) => {
    const requestFields = ['referenceCd'];
    const endpoint = 'reference/deleteReference';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/getReference', (req, res) => {
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

router.post('/putReference', (req, res) => {
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

router.post('/deleteReference', (req, res) => {
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
    