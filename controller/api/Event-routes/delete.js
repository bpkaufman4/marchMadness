
const router = require('express').Router();
const { deleteEventFunction } = require('../../functions/eventFunctions');

router.get('', (req, res) => {
    const requestFields = ['GameID'];
    const endpoint = 'event/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteEventFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;