
const router = require('express').Router();
const { putAFunction } = require('../../functions/AFunctions');

router.get('', (req, res) => {
    const requestFields = [''];
    const endpoint = 'a/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putAFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;