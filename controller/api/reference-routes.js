
const router = require('express').Router();
const { putReferenceFunction, getReferenceFunction, deleteReferenceFunction } = require('../functions/referenceFunctions');


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
    