const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  headline: { type: String },
  summary: { type: String },
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  skills: [{ type: String }],
  education: [{ institute: String, degree: String, start: Date, end: Date, description: String }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
