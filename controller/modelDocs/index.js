const router = require('express').Router();

const userModelDoc = require('./userModelDocs');
const referenceModelDoc = require('./referenceModelDocs');
const referenceSetsModelDoc = require('./referenceSetsModelDocs');
const staticContentModelDoc = require('./staticContentModelDocs');

router.use('/user', userModelDoc);
router.use('/reference', referenceModelDoc);
router.use('/staticContent', staticContentModelDoc);
router.use('/referenceSets', referenceSetsModelDoc);

module.exports = router;