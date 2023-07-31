const router = require('express').Router();

router.get('/get', (req, res) => {
    const requestFields = ['email', 'userId', 'emailVerifyGUID'];
    const endpoint = 'users/getUser';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.get('/put', (req, res) => {
    const requestFields = []
})
module.exports = router;