
const router = require('express').Router();
const { getReferenceSetsFunction } = require('../../functions/referenceSetsFunctions');

router.get('', (req, res) => {
    const requestFields = ['referenceSet'];
    const endpoint = 'referenceSets/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getReferenceSetsFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;