
const router = require('express').Router();
const { putReferenceFunction } = require('../../functions/referenceFunctions');

router.get('', (req, res) => {
    const requestFields = ['referenceCd', 'referenceSet', 'referenceMeaning', 'display', 'description', 'activeInd', 'created', 'updated'];
    const endpoint = 'reference/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putReferenceFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;