
const router = require('express').Router();
const { putIpLoggingFunction } = require('../../functions/ipLoggingFunctions');

router.get('', (req, res) => {
    const requestFields = ['ipLoggingId', 'script_name', 'request_uri', 'query_string', 'request', 'remote_addr', 'http_x_real_ip', 'userId', 'created', 'updated', 'deletedAt'];
    const endpoint = 'ipLogging/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putIpLoggingFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;