const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);   

const quizRoutes = require('./routes/quiz');
app.use('/api/quiz', quizRoutes);

const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
