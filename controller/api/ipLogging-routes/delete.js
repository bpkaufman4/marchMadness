
const router = require('express').Router();
const { deleteIpLoggingFunction } = require('../../functions/ipLoggingFunctions');

router.get('', (req, res) => {
    const requestFields = ['ipLoggingId'];
    const endpoint = 'ipLogging/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteIpLoggingFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;