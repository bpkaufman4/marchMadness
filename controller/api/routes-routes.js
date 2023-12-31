const router = require('express').Router();
const fs = require('fs');
const generateRoutesFile = require('../../templates/routes-template');
const { createModelFile } = require('../../templates/modelFunctionsTemplate');

router.post('/generateRoutesFile', (req, res) => {
    const request = req.body;
    const fileContents = generateRoutesFile(request.tableName);
    const fileName = `controller/api/${request.tableName}-routes.js`
    fs.writeFile(fileName, fileContents, function (err) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({message: 'Success'});
    })
});

router.post('/createModelFile', (req, res) => {
    const request = req.body;
    createModelFile(request);
    res.json({message: 'Success'});
})

module.exports = router;