const Resume = require('../models/Resume');
const Project = require('../models/Project');

const externalAchievementWebhook = async (req, res, next) => {
  try {
    // Example payload:
    // { userEmail, type: 'course'|'project', title, description, source }
    const { userEmail, type, title, description, source } = req.body;
    if (!userEmail || !type) return res.status(400).json({ message: 'Missing fields' });

    // find user
    const User = require('../models/User');
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (type === 'project') {
      const project = new Project({ title, description: description || source, user: user._id });
      await project.save();
      let resume = await Resume.findOne({ user: user._id });
      if (!resume) resume = await Resume.create({ user: user._id, skills: [] });
      resume.projects.push(project._id);
      await resume.save();
      return res.json({ message: 'Project added to resume (via integration)', project });
    }

    // For course/certificates we can append to education/skills
    const resume = await Resume.findOneAndUpdate({ user: user._id }, { $addToSet: { skills: source ? [source] : [] } }, { new: true, upsert: true });
    return res.json({ message: 'Integration processed', resume });
  } catch (err) { next(err); }
};

module.exports = { externalAchievementWebhook };
