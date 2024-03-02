const router = require('express').Router();
const { User, ApiTeam, Team, Player } = require('../models');
const { getUserFunction } = require('./functions/userFunctions');
const { getLeagueFunction } = require('./functions/LeagueFunctions');
const { getTeamFunction } = require('./functions/TeamFunctions');
const sequelize = require('../config/connection');

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
        const leagues = getLeagueFunction({columnsToReturn: ['name', 'owner', 'leagueId', 'inLeague'], userId: req.session.userId});
        const teams = getTeamFunction({columnsToReturn: ['leagueId', 'name', 'league', 'teamId']});
        Promise.all([leagues, teams])
        .then(values => {
            console.log(values[1]);
            const allLeagues = values[0].reply.map(league => league.get({plain: true}));
            const myTeams = values[1].reply.map(team => team.get({plain: true}));
            const templateData = {leagues: allLeagues, teams: myTeams, session: req.session};
            console.log(templateData);
            res.render('home', templateData);
        })
    } else {
        res.redirect('/login');
    }
});

router.get('/syncHub', (req, res) => {
    ApiTeam.findAll()
    .then(reply => {
        const data = {teams: reply.map(team => team.get({plain: true}))};
        res.render('syncHub', data);
    })
});

router.get('/addLeague', (req, res) => {
    res.render('addLeague', {userId: req.session.userId})
})

router.get('/team/:teamId', (req, res) => {
    const request = {
        where: {
            teamId: req.params.teamId
        }, 
        include: {
            model: Player, 
            as: 'players', 
            attributes: {
                include: [
                    [sequelize.literal('(select sum(s.points) from statistic s where `players->playerTeam`.`playerPlayerID` = s.PlayerID)'), 
                    'points']
                ]
            }
        }
    }
    Team.findOne(request)
    .then(team => {
        const data = team.get({plain: true});
        console.log(data);
        res.render('team', data);
    })
})

module.exports = router;