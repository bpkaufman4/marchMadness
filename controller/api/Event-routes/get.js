
const router = require('express').Router();
const { getEventFunction } = require('../../functions/eventFunctions');

router.get('', (req, res) => {
    const requestFields = ['GameID', 'AwayTeamID', 'HomeTeamID'];
    const endpoint = 'event/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getEventFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;