const router = require('express').Router();
const {createModelFile} = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    createModelFile(request).then(response => {
        res.json(response);
    });
});

module.exports = router;