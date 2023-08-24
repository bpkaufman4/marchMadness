
const router = require('express').Router();
const { deleteStaticContentFunction } = require('../../functions/staticContentFunctions');

router.get('', (req, res) => {
    const requestFields = ['contentType'];
    const endpoint = 'staticContent/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deleteStaticContentFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;