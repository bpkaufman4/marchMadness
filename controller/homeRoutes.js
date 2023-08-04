const router = require('express').Router();
const { User } = require('../models');
const { getUserFunction } = require('./functions/userFunctions');

router.get('/adminUsers', (req, res) => {
    let request = {};
    request.columnsToReturn = ['firstName', 'lastName'];
    getUserFunction(request)
    .then(users => {
        let userData = users.map(user => user.get({plain: true}));
        res.render('users', {users: userData, layout: 'admin'});
    })
});

router.get('/userUsers', (req, res) => {
    User.findAll()
    .then(dbUserData => {
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