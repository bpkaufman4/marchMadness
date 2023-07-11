const router = require('express').Router();

router.get('/adminUsers', (req, res) => {
    res.render('users');
});

module.exports = router;