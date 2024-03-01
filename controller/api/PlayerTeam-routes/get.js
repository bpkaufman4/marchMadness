
const router = require('express').Router();
const { getPlayerTeamFunction } = require('../../functions/playerTeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['playerTeamId', 'playerId', 'teamId'];
    const endpoint = 'playerTeam/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getPlayerTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;