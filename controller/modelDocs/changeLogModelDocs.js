const router = require('express').Router();

    router.get('/get', (req, res) => {
        const requestFields = ['changeLogId', 'userId'];
        const endpoint = 'changeLog/getChangeLog';
        const renderData = {requestFields, endpoint};
    
        res.render('modelFileExercisor', renderData);
    });
    
    router.get('/put', (req, res) => {
        const requestFields = ['changeLogId', 'changeDetails', 'changeDateTime', 'userId', 'parentId', 'parentName', 'templateType', 'created', 'updated'];
        const endpoint = 'changeLog/putChangeLog';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    router.get('/delete', (req, res) => {
        const requestFields = ['changeLogId'];
        const endpoint = 'changeLog/deleteChangeLog';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    module.exports = router;
    