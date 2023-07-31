const router = require('express').Router();

router.get('/get', (req, res) => {
    const requestFields = ['email', 'userId', 'emailVerifyGUID'];
    const endpoint = 'user/getUser';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

module.exports = router;