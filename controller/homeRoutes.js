const router = require('express').Router();
const { User } = require('../models');

router.get('/adminUsers', (req, res) => {
    res.render('users', {layout: 'admin'});
});

router.get('/userUsers', (req, res) => {
    res.render('users');
});

router.get('/adminUser/:userId', (req, res) => {
    User.findOne({
        where: {
            userId: req.params.userId
        },
        include: ['userType', 'userStatus']
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        const user = dbUserData.get({ plain: true });
        res.render('user', { user, layout: 'admin' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;