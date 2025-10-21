const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  entityType: { type: String, enum: ['project','experience','course'], required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['pending','verified','rejected'], default: 'pending' },
  verifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('Verification', VerificationSchema);
