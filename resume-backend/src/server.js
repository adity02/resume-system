require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const resumeRoutes = require('./routes/resumes');
const integrationRoutes = require('./routes/integrations');
const verificationRoutes = require('./routes/verification');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/resume_system');

// base routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/verification', verificationRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
