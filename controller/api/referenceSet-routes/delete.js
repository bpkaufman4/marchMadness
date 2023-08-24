
const router = require('express').Router();
const { deleteReferenceSetFunction } = require('../../functions/referenceSetFunctions');

router.get('', (req, res) => {
    const requestFields = [''];
    const endpoint = 'referenceSet/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteReferenceSetFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;