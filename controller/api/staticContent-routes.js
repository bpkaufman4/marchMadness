
const router = require('express').Router();
const { putStaticContentFunction, getStaticContentFunction, deleteStaticContentFunction } = require('../functions/staticContentFunctions');

router.get('/getStaticContent', (req, res) => {
    const requestFields = ['contentType'];
    const endpoint = 'staticContent/getStaticContent';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/putStaticContent', (req, res) => {
    const requestFields = ['contentType', 'title', 'permalink', 'content', 'SEOTitle', 'SEOKeywords', 'SEODescription', 'articleData', 'parsedElements', 'created', 'updated'];
    const endpoint = 'staticContent/putStaticContent';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/deleteStaticContent', (req, res) => {
    const requestFields = ['contentType'];
    const endpoint = 'staticContent/deleteStaticContent';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

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
    