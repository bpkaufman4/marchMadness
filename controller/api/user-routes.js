const router = require('express').Router();
const { User } = require('../../models');
const sequelize = require('../../config/connection');


router.post('/getUser', (req, res) => {
    console.log(req.ip);
    let request = req.body;
    console.log(request);
    let newColumnsToReturn = [];
    let includes = [];
    if(request.columnsToReturn.length > 0) {
        for(let i = 0; i < request.columnsToReturn.length; i++) {
            switch(request.columnsToReturn[i]) {
                case 'statusCdMeaning':
                    newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.statusCd)'), 'statusCdMeaning']);
                    break;
                case 'statusCdDisplay':
                    newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.statusCd)'), 'statusCdDisplay']);
                    break;
                case 'userTypeCdMeaning':
                    newColumnsToReturn.push([sequelize.literal('(select referenceMeaning from reference where referenceCd = user.userTypeCd)'), 'userTypeCdMeaning']);
                    break;
                case 'userTypeCdDisplay':
                    newColumnsToReturn.push([sequelize.literal('(select display from reference where referenceCd = user.userTypeCd)'), 'userTypeCdDisplay']);
                    break;
                default:
                    newColumnsToReturn.push(request.columnsToReturn[i]);
                    break;
            }
        }
    }

    User.findAll({
        attributes: newColumnsToReturn,
        include: includes,
        limit: Number(request.pageSize),
        offset:((Number(request.page) - 1)*Number(request.pageSize))
    })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// put user

router.post('/putUser', (req, res) => {
    const request = req.body;
    let newRequest = {};
    for(const key in request) {
        switch(key) {
            case 'email':
            case 'lastName':
            case 'firstName':
            case 'pwd':
                newRequest[key] = request[key];
                break;
            case 'statusCdMeaning':
                newRequest['statusCd'] = sequelize.literal("(select referenceCd from reference where referenceMeaning = '"+request[key]+"' and referenceSet = 'USERSTATUS')");
                console.log(newRequest['statusCd']);
                break;  
            case 'userTypeCdMeaning':
                newRequest['userTypeCd'] = sequelize.literal("(select referenceCd from reference where referenceMeaning = '"+request[key]+"' and referenceSet = 'USERTYPE')");
                console.log(newRequest['userTypeCd']);
                break;
        }
    }
    if(request.userId) {
        User.update(newRequest, {
            where: {
                userId: request.userId
            }
        })
        .then(dbUserData => {
            console.log(dbUserData);
            if(!dbUserData[0]) {
                res.status(404).json({ message: 'No user foud with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } else {
        User.create(newRequest)
        .then(dbUserData => {
            console.log(dbUserData);
            if(!dbUserData) {
                res.status(400).json({ message: 'Something went wrong' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
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