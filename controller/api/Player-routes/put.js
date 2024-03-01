
const router = require('express').Router();
const { putPlayerFunction } = require('../../functions/PlayerFunctions');

router.get('', (req, res) => {
    const requestFields = ['PlayerID', 'FirstName', 'LastName', 'TeamID', 'createdAt', 'updatedAt', 'deletedAt'];
    const endpoint = 'player/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putPlayerFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;