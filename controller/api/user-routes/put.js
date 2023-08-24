
const router = require('express').Router();
const { putUserFunction } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['userId', 'email', 'pwd', 'lastName', 'firstName', 'statusCd', 'statusCdMeaning', 'userTypeCd', 'userTypeCdMeaning', 'lastLoginDate', 'lastIP', 'primaryPhone', 'cellPhone', 'state', 'zip', 'emailVerifyGUID', 'emailVerifyExpire', 'timeZoneId', 'lastActiveDateTime', 'profilePictureURL', 'profilePictureLocal', 'created', 'updated', 'deletedAt', 'bksTestColumn'];
    const endpoint = 'user/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
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

module.exports = router;