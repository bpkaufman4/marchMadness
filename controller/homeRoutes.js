const router = require('express').Router();

router.get('/', {
    title: 'Hello',
    message: 'world'
});

module.exports = router;