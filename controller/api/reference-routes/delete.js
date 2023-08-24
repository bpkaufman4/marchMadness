
const router = require('express').Router();
const { deleteReferenceFunction } = require('../../functions/referenceFunctions');

router.get('', (req, res) => {
    const requestFields = ['referenceCd'];
    const endpoint = 'reference/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteReferenceFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;