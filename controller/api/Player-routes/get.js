
const router = require('express').Router();
const { getPlayerFunction } = require('../../functions/PlayerFunctions');

router.get('', (req, res) => {
    const requestFields = ['playerId', 'apiTeamId'];
    const endpoint = 'Player/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getPlayerFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;