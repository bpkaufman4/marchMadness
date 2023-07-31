const router = require('express').Router();

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

    module.exports = router;
    