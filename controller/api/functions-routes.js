const router = require('express').Router();
const {createModelFile} = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    createModelFile(request);
    res.json({message: 'Success'});
});

module.exports = router;