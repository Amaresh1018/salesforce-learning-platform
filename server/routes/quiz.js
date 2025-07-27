const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// GET /api/quiz - fetch all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load quizzes' });
  }
});

// (Optional) POST /api/quiz - add a new quiz (for admin or seed)
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/quiz/:id - fetch one quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get quiz' });
  }
});

module.exports = router;
