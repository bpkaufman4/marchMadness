const router = require('express').Router();
const { putApiTeamFunction } = require('../../functions/apiTeamFunctions');

router.post('', (req, res) => {
    const request = req.body;
    res.json(request);
});

module.exports = router;