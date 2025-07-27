const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // index of correct option
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
