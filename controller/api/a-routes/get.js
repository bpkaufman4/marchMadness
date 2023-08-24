
const router = require('express').Router();
const { getAFunction } = require('../../functions/AFunctions');

router.get('', (req, res) => {
    const requestFields = [''];
    const endpoint = 'a/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getAFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;