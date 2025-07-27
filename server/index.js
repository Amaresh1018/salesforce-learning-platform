const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth'); // add this
app.use('/api/auth', authRoutes);           // and this

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
