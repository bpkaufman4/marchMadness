const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:userId', (req, res) => {
    User.findOne({
        where: {
            userId: req.params.userId
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userId = dbUserData.userId;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:userId', (req, res) => {
    User.update(req.body, {
        where: {
            userId: req.params.userId
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).jston({ message: 'No user foud with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:userId', (req, res) => {
    User.destroy({
        where: {
            userId: req.params.userId
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user foud with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user foud with this email'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(404).json({ message: 'Incorrect password' });
            return;
        }
        res.json({ user: dbUserData, message: 'Login successful' });
    })
});

module.exports = router;