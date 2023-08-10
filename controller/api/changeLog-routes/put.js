
const router = require('express').Router();
const { putChangeLogFunction } = require('../../functions/ChangeLogFunctions');

router.get('', (req, res) => {
    const requestFields = ['changeLogId', 'changeDetails', 'changeDateTime', 'userId', 'parentId', 'parentName', 'templateType', 'created', 'updated'];
    const endpoint = 'changeLog/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putChangeLogFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;