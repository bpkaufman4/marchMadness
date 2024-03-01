
const router = require('express').Router();
const { deleteLeagueFunction } = require('../../functions/leagueFunctions');

router.get('', (req, res) => {
    const requestFields = ['leagueId'];
    const endpoint = 'league/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteLeagueFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;