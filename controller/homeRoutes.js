const router = require('express').Router();

router.get('/adminUsers', (req, res) => {
    res.render('users', {layout: 'admin'});
});

router.get('/userUsers', (req, res) => {
    res.render('users');
});
module.exports = router;