const router = require('express').Router();

    router.get('/get', (req, res) => {
        const requestFields = ['referenceSet'];
        const endpoint = 'referenceSets/getReferenceSets';
        const renderData = {requestFields, endpoint};
    
        res.render('modelFileExercisor', renderData);
    });
    
    router.get('/put', (req, res) => {
        const requestFields = ['referenceSet', 'display', 'description', 'deletableInd', 'created'];
        const endpoint = 'referenceSets/putReferenceSets';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    router.get('/delete', (req, res) => {
        const requestFields = ['referenceSet'];
        const endpoint = 'referenceSets/deleteReferenceSets';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    module.exports = router;
    