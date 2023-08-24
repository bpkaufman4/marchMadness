const router = require('express').Router();
const generateFunctionsFile = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    const generateFunctions = generateFunctionsFile(request);
    res.json({status: 'Success', message: generateFunctions.message});
});

module.exports = router;