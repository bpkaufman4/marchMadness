
const router = require('express').Router();
const { deleteUserFunction } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['userId'];
    const endpoint = 'user/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteUserFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;