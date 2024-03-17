const router = require('express').Router();
const { User, ApiTeam, Team, Player, League } = require('../models');
const { getUserFunction } = require('./functions/userFunctions');
const { getLeagueFunction } = require('./functions/LeagueFunctions');
const { getTeamFunction } = require('./functions/TeamFunctions');
const sequelize = require('../config/connection');
const { QueryTypes } = require('sequelize');

router.get('/adminUsers', (req, res) => {
    request = {};
    request.columnsToReturn = ['userId', 'firstName', 'lastName', 'email', 'fullName', 'statusCdMeaning', 'userTypeCdMeaning', 'userTypeCdDisplay', 'statusCdDisplay'];
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
    console.log(req.session);
    res.render('homepage', templateData);
});

router.get('/home', (req, res) => {
    if(req.session.loggedIn) {
        const leagues = getLeagueFunction({columnsToReturn: ['name', 'owner', 'leagueId', 'inLeague'], userId: req.session.userId});
        const teams = getTeamFunction({ownerId: req.session.userId, columnsToReturn: ['leagueId', 'name', 'league', 'teamId']});
        Promise.all([leagues, teams])
        .then(values => {
            const allLeagues = (values[0].reply.length > 0) ? values[0].reply.map(league => league.get({plain: true})) : [];
            const myTeams = (values[1].reply.length > 0) ? values[1].reply.map(team => team.get({plain: true})) : [];
            const templateData = {leagues: allLeagues, teams: myTeams, session: req.session};
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
        const data = {teams: team.get({plain: true}), session: req.session};
        console.log(data);
        res.render('team', data);
    })
});

router.get('/register', (req, res) => {
    res.render('register');
})
router.get('/league/:leagueId', (req, res) => {
    const request = {
        where: {
            leagueId: req.params.leagueId
        },
        include: ['teams']
    }
    League.findOne(request)
    .then(league => {
        const data = {league: league.get({plain: true}), session: req.session};
        console.log(data);
        res.render('league', data);
    });
})

router.get('/statsHub', (req, res) => {
    const statsNeeded = sequelize.query(`
        select * from ((
            select p.PlayerID, p.FirstName, p.LastName, otherTeam.Name, e.GameID, e.DateTime
                from player p 
                inner join event e on p.TeamID = e.HomeTeamID 
                left join ApiTeam otherTeam on otherTeam.TeamId = e.AwayTeamId
                where not EXISTS (select * from statistic s where s.PlayerId = p.PlayerID and e.GameID = s.GameID)
                and e.DateTime < now()
                and e.DateTime > date_sub(now(), interval 24 hour)
                and e.Status = 'Final'
        ) union all (
            select p.PlayerID, p.FirstName, p.LastName, otherTeam.Name, e.GameID, e.DateTime
                from player p 
                inner join event e on p.TeamID = e.AwayTeamID 
                left join ApiTeam otherTeam on otherTeam.TeamId = e.HomeTeamId
                where not EXISTS (select * from statistic s where s.PlayerId = p.PlayerID and e.GameID = s.GameID)
                and e.DateTime < now()
                and e.DateTime > date_sub(now(), interval 24 hour)
                and e.Status = 'Final'
        )) t order by t.DateTime asc;
    `)
})

module.exports = router;