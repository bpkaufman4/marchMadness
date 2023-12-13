const router = require('express').Router();
const { User } = require('../../../models');

const getRoutes = require('./get');
const putRoutes = require('./put');
const deleteRoutes = require('./delete');

router.use('/get', getRoutes);
router.use('/put', putRoutes);
router.use('/delete', deleteRoutes);

router.post('/login', (req, res) => {
    const request = req.body;
    let returnValue = {};
    console.log('login attempt', request);
    User.findOne({
        where: {email: request.email}
    })
    .then(reply => {
        console.log(reply);
        if(!reply || !reply.checkPassword(request.pwd)) {
            returnValue.status = 'SUCCESS';
            returnValue.message = 'Invalid Login';
            returnValue.reply = {};
            res.json(returnValue);
        } else {
            req.session.userId = reply.userId;
            req.session.loggedIn = true;
            returnValue.status = 'SUCCESS';
            returnValue.message = 'SUCCESS';
            returnValue.reply = reply;
            res.json(returnValue);
        }

    })
});

router.post('/logout', (req, res) => {
    req.session.userId = null;
    req.session.loggedIn = false;
    res.json({status: 'SUCCESS', message: 'Logged Out'});
});

module.exports = router; 