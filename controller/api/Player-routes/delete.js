
const router = require('express').Router();
const { deletePlayerFunction } = require('../../functions/PlayerFunctions');

router.get('', (req, res) => {
    const requestFields = ['PlayerID'];
    const endpoint = 'player/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deletePlayerFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;