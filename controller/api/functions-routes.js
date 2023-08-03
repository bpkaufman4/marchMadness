const router = require('express').Router();
const generateFunctionsFile = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    generateFunctionsFile(request);
    res.json({message: 'Success'});
});

module.exports = router;