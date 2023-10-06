
const router = require('express').Router();
const { putPostFunction } = require('../../functions/postFunctions');

router.get('', (req, res) => {
    const requestFields = ['postId', 'userId', 'content', 'created', 'updated', 'deletedAt'];
    const endpoint = 'post/put';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})

router.post('', (req, res) => {
    const request = req.body;
    putPostFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;