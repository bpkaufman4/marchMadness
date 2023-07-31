const router = require('express').Router();

const userModelDoc = require('./userModelDoc');

router.use('/user', userModelDoc);

module.exports = router;