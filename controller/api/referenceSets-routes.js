
const router = require('express').Router();
const { putReferenceSetsFunction, getReferenceSetsFunction, deleteReferenceSetsFunction } = require('../functions/referenceSetsFunctions');


router.post('/getReferenceSets', (req, res) => {
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

router.post('/putReferenceSets', (req, res) => {
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

router.post('/deleteReferenceSets', (req, res) => {
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
    