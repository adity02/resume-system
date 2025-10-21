const Verification = require('../models/Verification');
const Project = require('../models/Project');

const requestVerification = async (req, res, next) => {
  try {
    const { entityType, entityId } = req.body;
    if (!entityType || !entityId) return res.status(400).json({ message: 'Missing fields' });

    const v = new Verification({ entityType, entityId });
    await v.save();
    res.status(201).json(v);
  } catch (err) { next(err); }
};

const completeVerification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const verification = await Verification.findById(id);
    if (!verification) return res.status(404).json({ message: 'Not found' });
    verification.status = status;
    verification.notes = notes || verification.notes;
    verification.verifier = req.user._id;
    verification.completedAt = new Date();
    await verification.save();

    // reflect on entity (e.g., project)
    if (verification.entityType === 'project') {
      const proj = await Project.findById(verification.entityId);
      if (proj) proj.verified = status === 'verified';
      await proj.save();
    }

    res.json(verification);
  } catch (err) { next(err); }
};

module.exports = { requestVerification, completeVerification };
