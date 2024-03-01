
const router = require('express').Router();
const { deleteApiTeamFunction } = require('../../functions/apiTeamFunctions');

router.get('', (req, res) => {
    const requestFields = ['TeamID'];
    const endpoint = 'apiTeam/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteApiTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;