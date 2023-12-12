
const router = require('express').Router();
const { putLeagueFunction } = require('../../functions/LeagueFunctions');

router.get('', (req, res) => {
    const requestFields = ['leagueId', 'name', 'ownerId', 'privateInd', 'password', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'League/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putLeagueFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;