
const router = require('express').Router();
const { deleteStatisticFunction } = require('../../functions/StatisticFunctions');

router.get('', (req, res) => {
    const requestFields = ['statisticId'];
    const endpoint = 'Statistic/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteStatisticFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;