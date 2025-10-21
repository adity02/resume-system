const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { requestVerification, completeVerification } = require('../controllers/verificationController');

router.post('/request', auth, requestVerification);
router.put('/:id/complete', auth, completeVerification);

module.exports = router;
