const User = require('../models/User');
const Resume = require('../models/Resume');
const { sendEmail } = require('../utils/emailMock');

const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const resume = await Resume.findOne({ user: user._id }).populate('projects experiences');
    res.json({ user, resume });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const updates = req.body;
    Object.assign(user, updates);
    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const inviteVerifier = async (req, res, next) => {
  try {
    // Example: admin invites an email to be a verifier
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Missing email' });
    // send simple email
    await sendEmail({ to: email, subject: 'Invitation to be verifier', text: 'You have been invited...' });
    res.json({ message: 'Invitation sent (mock)' });
  } catch (err) { next(err); }
};

module.exports = { getProfile, updateProfile, inviteVerifier };
