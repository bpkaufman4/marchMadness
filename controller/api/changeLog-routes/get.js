
const router = require('express').Router();
const { getChangeLogFunction } = require('../../functions/ChangeLogFunctions');

router.get('', (req, res) => {
    const requestFields = ['changeLogId', 'userId'];
    const endpoint = 'changeLog/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getChangeLogFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;