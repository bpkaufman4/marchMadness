
const router = require('express').Router();
const { deleteReferenceSetsFunction } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['referenceSet'];
    const endpoint = 'referenceSets/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteReferenceSetsFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;