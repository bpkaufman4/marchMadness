
const router = require('express').Router();
const { putUserFunction, getUserFunction, deleteUserFunction } = require('../functions/userFunctions');

router.get('/getUser', (req, res) => {
    const requestFields = ['userId', 'email', 'lastName', 'emailVerifyGUID'];
    const endpoint = 'user/getUser';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/putUser', (req, res) => {
    const requestFields = ['userId', 'email', 'pwd', 'lastName', 'firstName', 'statusCd', 'statusCdMeaning', 'userTypeCd', 'userTypeCdMeaning', 'lastLoginDate', 'lastIP', 'primaryPhone', 'cellPhone', 'state', 'zip', 'emailVerifyGUID', 'emailVerifyExpire', 'timeZoneId', 'lastActiveDateTime', 'profilePictureURL', 'profilePictureLocal', 'created', 'updated', 'deletedAt', 'bksTestColumn'];
    const endpoint = 'user/putUser';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/deleteUser', (req, res) => {
    const requestFields = ['userId'];
    const endpoint = 'user/deleteUser';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/getUser', (req, res) => {
    let request = req.body;

    getUserFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/putUser', (req, res) => {
    const request = req.body;
    putUserFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/deleteUser', (req, res) => {
    const request = req.body;
    deleteUserFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
    