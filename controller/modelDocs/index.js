const router = require('express').Router();

const userModelDoc = require('./userModelDocs');

router.use('/user', userModelDoc);

module.exports = router;