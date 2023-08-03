
const router = require('express').Router();
const { putReferenceSetsFunction, getReferenceSetsFunction, deleteReferenceSetsFunction } = require('../functions/referenceSetsFunctions');

router.get('/get', (req, res) => {
    const requestFields = ['referenceSet'];
    const endpoint = 'referenceSets/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/put', (req, res) => {
    const requestFields = ['referenceSet', 'display', 'description', 'deletableInd', 'created'];
    const endpoint = 'referenceSets/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/delete', (req, res) => {
    const requestFields = ['referenceSet'];
    const endpoint = 'referenceSets/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/get', (req, res) => {
    let request = req.body;

    getReferenceSetsFunction(request)
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
    putReferenceSetsFunction(request)
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
    deleteReferenceSetsFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
    