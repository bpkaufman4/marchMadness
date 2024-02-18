const router = require('express').Router();
const { seedApiTeamFunction } = require('../../functions/apiTeamFunctions');

router.post('', (req, res) => {
    let request = req.body;

    seedApiTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;