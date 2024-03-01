
const router = require('express').Router();
const { deletePlayerTeamFunction } = require('../../functions/PlayerTeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['playerTeamId'];
    const endpoint = 'playerTeam/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deletePlayerTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;