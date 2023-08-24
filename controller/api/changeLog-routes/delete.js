
const router = require('express').Router();
const { deleteChangeLogFunction } = require('../../functions/changeLogFunctions');

router.get('', (req, res) => {
    const requestFields = ['changeLogId'];
    const endpoint = 'changeLog/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteChangeLogFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;