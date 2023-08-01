
const router = require('express').Router();
const { putStaticContentFunction, getStaticContentFunction, deleteStaticContentFunction } = require('../functions/staticContentFunctions');

router.get('/get', (req, res) => {
    const requestFields = ['contentType'];
    const endpoint = 'staticContent/getStaticContent';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/put', (req, res) => {
    const requestFields = ['contentType', 'title', 'permalink', 'content', 'SEOTitle', 'SEOKeywords', 'SEODescription', 'articleData', 'parsedElements', 'created', 'updated'];
    const endpoint = 'staticContent/putStaticContent';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/delete', (req, res) => {
    const requestFields = ['contentType'];
    const endpoint = 'staticContent/deleteStaticContent';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/get', (req, res) => {
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

router.post('/put', (req, res) => {
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

router.post('/delete', (req, res) => {
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
    