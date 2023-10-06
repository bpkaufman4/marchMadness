const router = require('express').Router();
const { User } = require('../../../models');

/*
------------------------------Paste into api/index.js----------------------------------
const userRoutes = require('./user-routes');
router.use('/user', userRoutes);
---------------------------------------------------------------------------------------
*/

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
            return;
        }

        console.log(reply);

        req.session.save(() => {
            req.session.userId = reply.userId;
        })
    })
});

module.exports = router; 