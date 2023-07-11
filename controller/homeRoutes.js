const router = require('express').Router();

router.get('/adminUsers', (req, res) => {
    res.render('users', {layout: 'admin'});
});

module.exports = router;