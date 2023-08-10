
const router = require('express').Router();
const { getPostFunction } = require('../../functions/userFunctions');

router.get('', (req, res) => {
    const requestFields = ['postId', 'userId'];
    const endpoint = 'post/get';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
});

router.post('', (req, res) => {
    let request = req.body;

    getPostFunction(request)
    .then(returnValue => {
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;