
const router = require('express').Router();
const { getApiTeamFunction } = require('../../functions/apiTeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['apiTeamId'];
    const endpoint = 'apiTeam/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getApiTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;