
const router = require('express').Router();
const { getStaticContentFunction } = require('../../functions/staticContentFunctions');

router.get('', (req, res) => {
    const requestFields = ['contentType'];
    const endpoint = 'staticContent/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getStaticContentFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;