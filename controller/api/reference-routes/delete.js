
const router = require('express').Router();
const { getReferenceFunction } = require('../../functions/userFunctions');

router.get('/get', (req, res) => {
    const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning'];
    const endpoint = 'reference/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('/get', (req, res) => {
    let request = req.body;

    getReferenceFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;