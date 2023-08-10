
const router = require('express').Router();
const { putReferenceSetsFunction } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['referenceSet', 'display', 'description', 'deletableInd', 'created'];
    const endpoint = 'referenceSets/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putReferenceSetsFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;