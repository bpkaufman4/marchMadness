const router = require('express').Router();
const { User } = require('../models');
const { getUserFunction } = require('./functions/userFunctions');
const { getLeagueFunction } = require('./functions/leagueFunctions');

router.get('/adminUsers', (req, res) => {
    request = {};
    request.columnsToReturn = ['userId', 'firstName', 'lastName', 'email', 'fullName', 'statusCdMeaning', 'userTypeCdMeaning', 'userTypeCdDisplay', 'statusCdDisplay'];
    getUserFunction(request).then(users => {
        console.log(users);
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
    console.log(req.session);
    res.render('homepage', templateData);
});

router.get('/home', (req, res) => {
    if(req.session.loggedIn) {
        getLeagueFunction({columnsToReturn: ['name', 'owner']})
        .then(reply => {
            if(reply.status == 'FAIL') return getLeague;
            console.log(req.session);
            const templateData = {leagues: reply.reply, session: req.session};
            res.render('home', templateData);
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;