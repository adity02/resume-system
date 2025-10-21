const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getResume, updateResume, addProject, addExperience, generateAutoSummary } = require('../controllers/resumeController');

router.get('/', auth, getResume);
router.put('/', auth, updateResume);
router.post('/project', auth, addProject);
router.post('/experience', auth, addExperience);
router.post('/generate-summary', auth, generateAutoSummary);

module.exports = router;
