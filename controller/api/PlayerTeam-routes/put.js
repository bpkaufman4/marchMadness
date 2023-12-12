
const router = require('express').Router();
const { putPlayerTeamFunction } = require('../../functions/PlayerTeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['playerTeamId', 'playerId', 'teamId', 'createdAt', 'updatedAt'];
    const endpoint = 'PlayerTeam/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putPlayerTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;