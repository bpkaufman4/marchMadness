
const router = require('express').Router();
const { putUserFunction, getUserFunction, deleteUserFunction } = require('../functions/userFunctions');


router.post('/getUser', (req, res) => {
    let request = req.body;

    getUserFunction(request)
    .then(returnValue => {
        console.log(returnValue);
        res.json(returnValue)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/putUser', (req, res) => {
    const request = req.body;
    putUserFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/deleteUser', (req, res) => {
    const request = req.body;
    deleteUserFunction(request)
    .then(returnValue => {
        res.json(returnValue);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
    getUserFunction({
        email: req.body.email,
        columnsToReturn: ['userId', 'userTypeCdMeaning'
    ]
    }).then(dbUserData => {
        console.log(dbUserData);
        if(!dbUserData) {
            res.status(404).json({ message: 'No user foud with this email'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.pwd);
        console.log(validPassword);
        if(!validPassword) {
            res.status(404).json({ message: 'Incorrect password' });
            return;
        }

        User.update({lastLoginDate: new Date() },{
            where: {
                userId: dbUserData.userId
            }
        })

        req.session.userId = dbUserData.userId;
        req.session.loggedIn = true;
        
        console.log(dbUserData);

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
    