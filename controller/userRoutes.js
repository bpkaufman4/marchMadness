
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } =  require('../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: [
            'fullName',
            'email',
            'userId'
        ],
        include: ['userType', 'userStatus']
    })
    .then(dbUserData => {
        console.log(dbUserData);
        const users = dbUserData.map(user => user.get({ plain: true }));
        res.render('users', { users });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;