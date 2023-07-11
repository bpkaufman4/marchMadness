const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello',
        message: 'world'
    })
});

module.exports = router;