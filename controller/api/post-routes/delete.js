
const router = require('express').Router();
const { deletePostFunction } = require('../../functions/postFunctions');

router.get('', (req, res) => {
    const requestFields = ['postId'];
    const endpoint = 'post/delete';
    const renderData = {requestFields, endpoint};

    res.render('modelFileExercisor', renderData);
})


router.post('', (req, res) => {
    const request = req.body;
    deletePostFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;