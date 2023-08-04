const router = require('express').Router();
const { User } = require('../models');

router.get('/adminUsers', (req, res) => {
    const users = User.findAll();
    res.render('users', {layout: 'admin', users});
});

router.get('/userUsers', (req, res) => {
    User.findAll()
    .then(dbUserData => {
        console.log(dbUserData);
        res.render('users');
    })
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/', (req, res) => {
    const templateData = {
        session: req.session
    }
    res.render('homepage', templateData);
});
module.exports = router;