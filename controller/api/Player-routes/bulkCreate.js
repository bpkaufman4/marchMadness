const router = require('express').Router();
const { bulkCreatePlayers } = require('../../functions/PlayerFunctions');

router.post('', (req, res) => {
    let request = req.body;

    bulkCreatePlayers(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;