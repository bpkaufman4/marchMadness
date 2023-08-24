
const router = require('express').Router();
const { getIpLoggingFunction } = require('../../functions/ipLoggingFunctions');

router.get('', (req, res) => {
    const requestFields = ['ipLoggingId', 'script_name', 'remote_addr', 'http_x_real_ip', 'userId', 'created'];
    const endpoint = 'ipLogging/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getIpLoggingFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;