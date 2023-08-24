
const router = require('express').Router();
const { deleteAFunction } = require('../../functions/AFunctions');

router.get('', (req, res) => {
    const requestFields = [''];
    const endpoint = 'a/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteAFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;