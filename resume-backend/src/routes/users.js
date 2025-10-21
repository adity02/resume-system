const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile, inviteVerifier } = require('../controllers/userController');

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);
router.post('/invite-verifier', auth, inviteVerifier); // admin can invite

module.exports = router;
