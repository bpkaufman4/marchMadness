
const router = require('express').Router();
const { putApiTeamFunction } = require('../../functions/apiTeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['TeamID', 'Key', 'School', 'Name', 'ShortDisplayName', 'TeamLogoUrl', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'apiTeam/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putApiTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;