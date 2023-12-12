
const router = require('express').Router();
const { putStatisticFunction } = require('../../functions/StatisticFunctions');

router.get('', (req, res) => {
    const requestFields = ['statisticId', 'playerId', 'points', 'eventId', 'completed', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'Statistic/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putStatisticFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;