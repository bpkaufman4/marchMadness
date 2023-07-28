
const router = require('express').Router();
const { putStaticContentFunction, getStaticContentFunction, deleteStaticContentFunction } = require('../functions/staticContentFunctions');


router.post('/getStaticContent', (req, res) => {
    let request = req.body;

    getStaticContentFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/putStaticContent', (req, res) => {
    const request = req.body;
    putStaticContentFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/deleteStaticContent', (req, res) => {
    const request = req.body;
    deleteStaticContentFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
    