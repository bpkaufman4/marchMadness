
const router = require('express').Router();
const { putChangeLogFunction, getChangeLogFunction, deleteChangeLogFunction } = require('../functions/changeLogFunctions');


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
    