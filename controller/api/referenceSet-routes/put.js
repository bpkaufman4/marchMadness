
const router = require('express').Router();
const { putReferenceSetFunction } = require('../../functions/referenceSetFunctions');

router.get('', (req, res) => {
    const requestFields = [''];
    const endpoint = 'referenceSet/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putReferenceSetFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;