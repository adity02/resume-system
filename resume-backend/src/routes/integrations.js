const express = require('express');
const router = express.Router();
const { externalAchievementWebhook } = require('../controllers/integrationController');

// Public webhook that external platforms POST to
router.post('/webhook/achievement', externalAchievementWebhook);

module.exports = router;
