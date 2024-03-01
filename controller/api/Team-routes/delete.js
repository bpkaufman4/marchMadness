
const router = require('express').Router();
const { deleteTeamFunction } = require('../../functions/teamFunctions');

router.get('', (req, res) => {
    const requestFields = ['teamId'];
    const endpoint = 'team/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteTeamFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;