const router = require('express').Router();
const { User } = require('../models');

router.get('/adminUsers', (req, res) => {
    res.render('users', {layout: 'admin'});
});

router.get('/userUsers', (req, res) => {
    res.render('users');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/', (req, res) => {
    console.log(req);
    const templateData = {
        session: req.session
    }
    res.render('homepage', templateData);
});
module.exports = router;