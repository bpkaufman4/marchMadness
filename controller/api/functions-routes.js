const router = require('express').Router();
const {createModelFile} = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    const createModel = createModelFile(request);
    res.json({status: 'Success', message: createModel.message});
});

module.exports = router;