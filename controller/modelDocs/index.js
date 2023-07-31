const router = require('express').Router();

const userModelDoc = require('./userModelDocs');
const referenceModelDoc = require('./referenceModelDocs');
const referenceSetsModelDoc = require('./referenceSetsModelDocs');
const staticContentModelDoc = require('./staticContentModelDocs');
const changeLogModelDoc = require('./changeLogModelDocs');

router.use('/user', userModelDoc);
router.use('/reference', referenceModelDoc);
router.use('/staticContent', staticContentModelDoc);
router.use('/referenceSets', referenceSetsModelDoc);
router.use('/changeLog', changeLogModelDoc);

module.exports = router;