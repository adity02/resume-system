const Resume = require('../models/Resume');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const { generateSummary } = require('../utils/resumeGenerator');

const getResume = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let resume = await Resume.findOne({ user: userId }).populate('projects experiences');
    if (!resume) {
      resume = await Resume.create({ user: userId, skills: [] });
    }
    res.json(resume);
  } catch (err) { next(err); }
};

const updateResume = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updates = req.body;
    let resume = await Resume.findOneAndUpdate({ user: userId }, { ...updates, updatedAt: Date.now() }, { new: true, upsert: true });
    res.json(resume);
  } catch (err) { next(err); }
};

const addProject = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, description, link, technologies } = req.body;
    const project = new Project({ title, description, link, technologies, user: userId });
    await project.save();

    // attach to resume
    let resume = await Resume.findOne({ user: userId });
    if (!resume) resume = await Resume.create({ user: userId, skills: [] });
    resume.projects.push(project._id);
    await resume.save();

    res.status(201).json(project);
  } catch (err) { next(err); }
};

const addExperience = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, company, startDate, endDate, description } = req.body;
    const exp = new Experience({ title, company, startDate, endDate, description, user: userId });
    await exp.save();

    let resume = await Resume.findOne({ user: userId });
    if (!resume) resume = await Resume.create({ user: userId, skills: [] });
    resume.experiences.push(exp._id);
    await resume.save();

    res.status(201).json(exp);
  } catch (err) { next(err); }
};

const generateAutoSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { summary, headline } = await generateSummary(userId);
    const resume = await Resume.findOneAndUpdate({ user: userId }, { summary, headline, updatedAt: Date.now() }, { new: true, upsert: true });
    res.json({ resume, summary });
  } catch (err) { next(err); }
};

module.exports = { getResume, updateResume, addProject, addExperience, generateAutoSummary };
