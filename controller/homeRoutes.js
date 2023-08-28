const router = require('express').Router();
const { User } = require('../models');
const { getUserFunction } = require('./functions/userFunctions');

router.get('/adminUsers', (req, res) => {
    request = {};
    request.columnsToReturn ['userId', 'firstName', 'lastName', 'email', 'fullName', 'statusCdMeaning', 'userTypeCdMeaning', 'userTypeCdDisplay', 'statusCdDisplay'];
    getUserFunction(request).then(users => {
        res.render('users', {layout: 'admin', users});
    });
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