const router = require('express').Router();
const fs = require('fs');
const generateRoutesFile = require('../../templates/routes-template');

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

router.post('/getUseCases', (req, res) => {
    const request = req.body;
    res.json({message: 'Success'});
})

module.exports = router;