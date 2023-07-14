const router = require('express').Router();
const { User, Reference } = require('../../models');
const { Sequelize } = require('sequelize');

// Create User 
router.post('/', (req, res) => {
    const request = req.body;
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            case 'email':
            case 'lastName':
            case 'firstName':
            case 'pwd':
                newRequest[key] = request[key];
            case 'statusCdMeaning':
                Reference.findOne({
                    where: {
                        referenceSet: 'USERSTATUS',
                        referenceMeaning: request[key]
                    }
                }).then(dbRefData => {
                    newRequest['statusCd'] = dbRefData.referenceCd;
                })
            case 'userTypeCdMeaning':
                Reference.findOne({
                    where: {
                        referenceSet: 'USERTYPE',
                        referenceMeaning: request[key]
                    }
                }).then(dbRefData => {
                    newRequest['userTypeCd'] = dbRefData.referenceCd;
                })
        }
    }
    User.create(newRequest)
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

router.post('/getUsers', (req, res) => {
    let request = req.body;
    User.findAll({
        attributes: request.columnsToReturn,
        include: request.joins,
        limit: request.limit,
        offset:((request.page - 1)*request.limit)
    })
    .then(dbUserData => {
        console.log(dbUserData);
        res.json(dbUserData)
    })
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

router.get('/', (req, res) => {
    User.findAll()
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.put('/:userId', (req, res) => {
    User.update(req.body, {
        where: {
            userId: req.params.userId
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
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
        const validPassword = dbUserData.checkPassword(req.body.pwd);
        if(!validPassword) {
            res.status(404).json({ message: 'Incorrect password' });
            return;
        }

        User.update({lastLoginDate: new Date() },{
            where: {
                userId: dbUserData.userId
            }
        })

        req.session.save(() => {
            req.session.userId = dbUserData.userId;
            req.session.loggedIn = true;
        });

        res.json({ user: dbUserData, message: 'Login successful' });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(204).end();
    }
});

module.exports = router;