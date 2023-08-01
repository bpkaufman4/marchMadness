const router = require('express').Router();

    router.get('/get', (req, res) => {
        const requestFields = ['userId', 'email', 'lastName', 'emailVerifyGUID'];
        const endpoint = 'user/getUser';
        const renderData = {requestFields, endpoint};
    
        res.render('modelFileExercisor', renderData);
    });
    
    router.get('/put', (req, res) => {
        const requestFields = ['userId', 'email', 'pwd', 'lastName', 'firstName', 'statusCd', 'statusCdMeaning', 'userTypeCd', 'userTypeCdMeaning', 'lastLoginDate', 'lastIP', 'primaryPhone', 'cellPhone', 'state', 'zip', 'emailVerifyGUID', 'emailVerifyExpire', 'timeZoneId', 'lastActiveDateTime', 'profilePictureURL', 'profilePictureLocal', 'created', 'updated', 'deletedAt', 'bksTestColumn'];
        const endpoint = 'user/putUser';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    router.get('/delete', (req, res) => {
        const requestFields = ['userId'];
        const endpoint = 'user/deleteUser';
        const renderData = {requestFields, endpoint};

        res.render('modelFileExercisor', renderData);
    })

    module.exports = router;
    