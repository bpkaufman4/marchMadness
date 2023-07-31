const router = require('express').Router();

router.get('/get', (req, res) => {
    const requestFields = ['email', 'userId', 'emailVerifyGUID'];
    const endPoint = 'user/getUser';
    const renderData = {requestFields, endPoint};

    res.render('modelFiltExercisor', renderData);
});

module.exports = router;