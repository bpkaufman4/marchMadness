
const router = require('express').Router();
const { putEventFunction } = require('../../functions/EventFunctions');

router.get('', (req, res) => {
    const requestFields = ['eventId', 'apiEventId', 'homeApiId', 'awayApiId', 'startDate', 'homeScore', 'awayScore', 'homeTeamName', 'awayTeamName', 'homeTeamLogoUrl', 'awayTeamLogoUrl', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'Event/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putEventFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;