
const router = require('express').Router();
const { getReferenceSetFunction } = require('../../functions/referenceSetFunctions');

router.get('', (req, res) => {
    const requestFields = [''];
    const endpoint = 'referenceSet/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getReferenceSetFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;