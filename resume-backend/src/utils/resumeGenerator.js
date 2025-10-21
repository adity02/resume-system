const Resume = require('../models/Resume');
const User = require('../models/User');

const generateSummary = async (userId) => {
  // Loads user and resume minimal info and returns a structured summary.
  const user = await User.findById(userId).lean();
  const resume = await Resume.findOne({ user: userId }).populate('projects experiences').lean();

  const name = user ? user.name : 'Candidate';
  const topSkills = (resume && resume.skills && resume.skills.slice(0,5).join(', ')) || 'Quick learner';
  const headline = resume && resume.headline ? resume.headline : `${name} — Student / Professional`;

  const projects = (resume && resume.projects && resume.projects.slice(0,3).map(p => p.title).join(', ')) || '';
  const experiences = (resume && resume.experiences && resume.experiences.slice(0,2).map(e => e.title).join(', ')) || '';

  const summary = `${headline}. ${name} has demonstrated skills in ${topSkills}. Key projects include ${projects}. Experience includes ${experiences}. Motivated to apply skills in internships and real-world projects.`;

  return { summary, headline };
};

module.exports = { generateSummary };
