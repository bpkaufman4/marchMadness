
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } =  require('../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: [
            'firstName',
            'lastName',
            'email',
            'userId'
        ],
        include: ['userType', 'userStatus']
    })
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({ plain: true }));
        console.log(users);
        res.render('users', { users });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;