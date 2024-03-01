
const router = require('express').Router();
const { putStatisticFunction } = require('../../functions/statisticFunctions');

router.get('', (req, res) => {
    const requestFields = ['StatID', 'PlayerID', 'Points', 'GameID', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'statistic/put';
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