
const router = require('express').Router();
const { getStatisticFunction } = require('../../functions/StatisticFunctions');

router.get('', (req, res) => {
    const requestFields = ['statisticId', 'playerId', 'eventId'];
    const endpoint = 'Statistic/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getStatisticFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;