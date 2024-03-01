
const router = require('express').Router();
const { putTeamFunction } = require('../../functions/TeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['teamId', 'name', 'ownerId', 'leagueId', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'team/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;