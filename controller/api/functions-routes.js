const router = require('express').Router();
const {createModelFile} = require('../../templates/modelFunctionsTemplate');

router.post('/generateFunctionsFile', (req, res) => {
    const request = req.body;
    createModelFile(request).then(response => {
        console.log(response);
        res.json({status: 'Success', message: createModel.message});
    });
});

module.exports = router;