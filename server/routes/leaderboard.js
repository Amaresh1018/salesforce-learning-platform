const express = require('express');
const router = express.Router();

// Dummy leaderboard data
const leaderboard = [
  { username: 'UserA', points: 950 },
  { username: 'UserB', points: 820 }
];

// GET /api/leaderboard
router.get('/', (req, res) => {
  res.json(leaderboard);
});

module.exports = router;
