
const router = require('express').Router();
const { getUserFunction } = require('../../functions/UserFunctions');

router.get('', (req, res) => {
    const requestFields = ['userId', 'email', 'lastName', 'emailVerifyGUID'];
    const endpoint = 'user/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
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

module.exports = router;