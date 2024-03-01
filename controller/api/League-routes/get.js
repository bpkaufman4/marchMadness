
const router = require('express').Router();
const { getLeagueFunction } = require('../../functions/leagueFunctions');

router.get('', (req, res) => {
    const requestFields = ['leagueId', 'ownerId'];
    const endpoint = 'league/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getLeagueFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;