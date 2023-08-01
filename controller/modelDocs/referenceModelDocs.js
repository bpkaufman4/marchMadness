const router = require('express').Router();

    router.get('/get', (req, res) => {
        const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning'];
        const endpoint = 'reference/getReference';
        const renderData = {requestFields, endpoint};
    
        res.render('modelFileExercisor', renderData);
    });
    
    router.get('/put', (req, res) => {
        const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning', 'display', 'description', 'activeInd', 'created', 'updated'];
        const endpoint = 'reference/putReference';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    router.get('/delete', (req, res) => {
        const requestFields = ['referenceCd'];
        const endpoint = 'reference/deleteReference';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    module.exports = router;
    