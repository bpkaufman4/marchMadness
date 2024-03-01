
const router = require('express').Router();
const { getTeamFunction } = require('../../functions/TeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['teamId', 'ownerId', 'leagueId'];
    const endpoint = 'team/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;