const router = require('express').Router();
const generateFunctionsFile = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    var generateFunctions = generateFunctionsFile(request);
    console.log(generateFunctions);
    res.json({status: 'Success', message: generateFunctions.message});
});

module.exports = router;