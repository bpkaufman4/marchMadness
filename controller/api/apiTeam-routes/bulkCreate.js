const router = require('express').Router();
const { seedApiTeamFunction } = require('../../functions/apiTeamFunctions');

router.post('', (req, res) => {
    const request = req.body;
    res.json(request);
});

module.exports = router;