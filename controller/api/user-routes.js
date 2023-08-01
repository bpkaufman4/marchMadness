
const router = require('express').Router();
const { putUserFunction, getUserFunction, deleteUserFunction } = require('../functions/userFunctions');

router.get('/get', (req, res) => {
    const requestFields = ['userId', 'email', 'lastName', 'emailVerifyGUID'];
    const endpoint = 'user/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/put', (req, res) => {
    const requestFields = ['userId', 'email', 'pwd', 'lastName', 'firstName', 'statusCd', 'statusCdMeaning', 'userTypeCd', 'userTypeCdMeaning', 'lastLoginDate', 'lastIP', 'primaryPhone', 'cellPhone', 'state', 'zip', 'emailVerifyGUID', 'emailVerifyExpire', 'timeZoneId', 'lastActiveDateTime', 'profilePictureURL', 'profilePictureLocal', 'created', 'updated', 'deletedAt', 'bksTestColumn'];
    const endpoint = 'user/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.get('/delete', (req, res) => {
    const requestFields = ['userId'];
    const endpoint = 'user/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('/get', (req, res) => {
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

router.post('/put', (req, res) => {
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

router.post('/delete', (req, res) => {
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
    