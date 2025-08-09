import * as React from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

// Interfaces
interface Quiz {
  _id: string;
  title: string;
  description?: string;
  company?: string;
  difficulty?: string;
  progress?: number;
}

interface LeaderboardEntry {
  username: string;
  points: number;
  rankChange: number; // +1, -1, or 0
}

interface Badge {
  id: string;
  name: string;
  earned: boolean;
  icon: React.ReactNode;
}

interface Contest {
  id: string;
  title: string;
  startTime: Date;
}

// Helper Components

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function updateTimer() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return <span aria-live="polite">{timeLeft}</span>;
}

function CircularProgress({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex flex-col items-center transition-all duration-300 hover:scale-105 animate-staggerFadeIn">
      <svg className="w-20 h-20 text-indigo-500" viewBox="0 0 36 36" aria-label={`${label} progress`}>
        <circle
          className="text-gray-300 dark:text-gray-600"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          cx="18"
          cy="18"
          r="15.9155"
        />
        <circle
          className="text-indigo-600"
          strokeWidth="3"
          strokeDasharray={`${percent}, 100`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          cx="18"
          cy="18"
          r="15.9155"
          transform="rotate(-90 18 18)"
        />
        <text x="18" y="22" className="text-lg font-bold fill-current text-indigo-600" textAnchor="middle">
          {Math.round(percent)}%
        </text>
      </svg>
      <span className="mt-2 text-center font-semibold text-gray-900 dark:text-white">{label}</span>
    </div>
  );
}

// Main Dashboard Component

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [errorQuizzes, setErrorQuizzes] = useState<string | null>(null);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [errorLeaderboard, setErrorLeaderboard] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');

  // Placeholder badges, daily challenge, contests, user stats
  const badges: Badge[] = [
    {
      id: 'b1',
      name: 'Getting Started',
      earned: true,
      icon: <span aria-hidden="true">🎯</span>,
    },
    {
      id: 'b2',
      name: 'Quiz Master',
      earned: false,
      icon: <span aria-hidden="true">🏆</span>,
    },
    {
      id: 'b3',
      name: 'Fast Learner',
      earned: true,
      icon: <span aria-hidden="true">⚡</span>,
    },
  ];

  const dailyChallenge = {
    title: 'Lightning Round: Salesforce Basics',
    expiresAt: new Date(new Date().getTime() + 2 * 3600 * 1000), // 2 hours from now
  };

  const upcomingContests: Contest[] = [
    {
      id: 'c1',
      title: 'August Salesforce Challenge',
      startTime: new Date(new Date().getTime() + 2 * 24 * 3600 * 1000), // 2 days ahead
    },
  ];

  const userStats = {
    xp: 1420,
    nextLevelXp: 2000,
    quizzesCompleted: 45,
    streakCount: 8,
    rank: 42,
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const api = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }, [token]);

  useEffect(() => {
    if (!user || !token) return;
    async function fetchQuizzes() {
      setLoadingQuizzes(true);
      setErrorQuizzes(null);
      try {
        const res = await api.get<Quiz[]>('/quiz');
        setQuizzes(res.data);
      } catch (error: any) {
        setErrorQuizzes(error.response?.data?.error || error.message || 'Failed to load quizzes');
      } finally {
        setLoadingQuizzes(false);
      }
    }
    fetchQuizzes();
  }, [user, token, api]);

  useEffect(() => {
    if (!user || !token) return;
    async function fetchLeaderboard() {
      setLoadingLeaderboard(true);
      setErrorLeaderboard(null);
      try {
        const res = await api.get<LeaderboardEntry[]>('/leaderboard');
        setLeaderboard(res.data);
      } catch (error: any) {
        setErrorLeaderboard(error.response?.data?.error || error.message || 'Failed to load leaderboard');
      } finally {
        setLoadingLeaderboard(false);
      }
    }
    fetchLeaderboard();
  }, [user, token, api]);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch = !search || quiz.title.toLowerCase().includes(search.toLowerCase());
      const matchesCompany = selectedCompany === 'All Companies' || quiz.company === selectedCompany;
      const matchesDifficulty = selectedDifficulty === 'All Difficulties' || quiz.difficulty === selectedDifficulty;
      return matchesSearch && matchesCompany && matchesDifficulty;
    });
  }, [quizzes, search, selectedCompany, selectedDifficulty]);

  const xpProgressPercent = (userStats.xp / userStats.nextLevelXp) * 100;

  return (
    <main
      className="
        relative min-h-screen overflow-auto
        bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        text-gray-900 dark:text-white
        flex flex-col gap-10 p-6 max-w-7xl mx-auto
      "
    >
      {/* Hero Stats Panel */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg transition-all duration-500 animate-fadeIn">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold select-none shadow-md transition-transform hover:scale-105">
            {user ? user[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Hello, {user || 'Learner'}</h1>
            <p className="text-purple-700 dark:text-purple-300">Keep up the great work!</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-center md:justify-end">
          <div className="text-center transition-transform hover:scale-105">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Streak</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{userStats.streakCount} days</p>
          </div>
          <div className="text-center transition-transform hover:scale-105">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Rank</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{userStats.rank}</p>
          </div>
          <div className="text-center w-full md:w-auto">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">XP Progress</p>
            <div className="relative h-4 w-full md:w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
                aria-label="XP progress bar"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Next level: {userStats.nextLevelXp} XP</p>
          </div>
        </div>
      </section>

      {/* Daily Challenge Card */}
      <section className="bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl animate-staggerFadeIn [animation-delay:100ms]">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Daily Challenge</h2>
          <p className="text-gray-700 dark:text-gray-200">{dailyChallenge.title}</p>
          <p className="text-indigo-700 dark:text-indigo-300">
            Time left: <CountdownTimer targetDate={dailyChallenge.expiresAt} />
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-semibold transition-transform hover:scale-105">
          Start Now
        </button>
      </section>

      {/* Topic Progress Charts */}
      <section aria-label="Topic Progress" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <CircularProgress label="Admin" percent={75} />
        <CircularProgress label="Developer" percent={65} />
        <CircularProgress label="Sales" percent={40} />
      </section>

      {/* Filters & Search */}
      <section className="flex flex-col md:flex-row gap-4 items-center bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md rounded-2xl p-5 justify-between shadow-md transition-all duration-300 animate-staggerFadeIn [animation-delay:200ms]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search quizzes..."
          className="w-full md:w-1/2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <div className="flex gap-3 w-full md:w-auto justify-center">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-2 rounded-full bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white border border-transparent hover:border-indigo-500 transition"
          >
            <option>All Companies</option>
            <option>Salesforce</option>
            <option>Google</option>
            <option>Amazon</option>
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 rounded-full bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white border border-transparent hover:border-indigo-500 transition"
          >
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="animate-staggerFadeIn [animation-delay:300ms]">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Available Quizzes</h2>
        {loadingQuizzes && <p className="text-gray-600 dark:text-gray-300">Loading quizzes...</p>}
        {errorQuizzes && <p className="text-red-600 font-semibold">{errorQuizzes}</p>}
        {!loadingQuizzes && !errorQuizzes && filteredQuizzes.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">No quizzes found.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <div
              key={quiz._id}
              tabIndex={0}
              role="button"
              onClick={() => alert(`Starting quiz: ${quiz.title}`)}
              className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-md cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 animate-staggerFadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-2 flex gap-2 items-center">
                {quiz.company && (
                  <span className="bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 rounded-full px-3 py-1 text-xs font-semibold select-none">
                    {quiz.company}
                  </span>
                )}
                {quiz.difficulty && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold select-none ${
                      quiz.difficulty === 'Easy'
                        ? 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : quiz.difficulty === 'Medium'
                        ? 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : quiz.difficulty === 'Hard'
                        ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                )}
              </div>
              <h3 className="text-indigo-900 dark:text-indigo-200 font-semibold text-lg mb-1 flex items-center gap-2">
                <span aria-hidden="true">📝</span> {quiz.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{quiz.description}</p>
              <button
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition-transform hover:scale-105"
                aria-label={`Start quiz ${quiz.title}`}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg mt-10 transition-all duration-300 animate-staggerFadeIn [animation-delay:400ms]">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Leaderboard</h2>
        {loadingLeaderboard && <p className="text-gray-600 dark:text-gray-300">Loading leaderboard...</p>}
        {errorLeaderboard && <p className="text-red-600 font-semibold">{errorLeaderboard}</p>}
        {!loadingLeaderboard && !errorLeaderboard && leaderboard.length === 0 && <p className="text-gray-600 dark:text-gray-300">No leaderboard data.</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="p-2 text-sm font-semibold text-gray-900 dark:text-white">Rank</th>
                <th className="p-2 text-sm font-semibold text-gray-900 dark:text-white">User</th>
                <th className="p-2 text-sm font-semibold text-gray-900 dark:text-white">XP</th>
                <th className="p-2 text-sm font-semibold text-gray-900 dark:text-white">Change</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={entry.username}
                  className={`transition-all duration-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 ${
                    user === entry.username ? 'bg-indigo-200/50 dark:bg-indigo-700/30 font-semibold' : ''
                  }`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-semibold uppercase shadow-sm transition-transform hover:scale-105">
                      {entry.username.slice(0, 2)}
                    </div>
                    <span>{entry.username}</span>
                  </td>
                  <td className="p-2">{entry.points} pts</td>
                  <td className="p-2">
                    {entry.rankChange > 0 && (
                      <span aria-label="Rank increased" title="Rank increased" className="text-green-500">
                        ⬆️{entry.rankChange}
                      </span>
                    )}
                    {entry.rankChange < 0 && (
                      <span aria-label="Rank decreased" title="Rank decreased" className="text-red-500">
                        ⬇️{Math.abs(entry.rankChange)}
                      </span>
                    )}
                    {entry.rankChange === 0 && (
                      <span aria-label="Rank unchanged" title="Rank unchanged">
                        ➡️
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Achievements Row */}
      <section className="mt-10 animate-staggerFadeIn [animation-delay:500ms]">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Achievement Badges</h2>
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`group relative flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:scale-110 ${
                badge.earned ? 'opacity-100' : 'opacity-40 grayscale'
              }`}
              aria-label={`${badge.name} badge${badge.earned ? ', earned' : ', locked'}`}
            >
              <div className="text-5xl">{badge.icon}</div>
              <p className="mt-2 font-semibold text-gray-900 dark:text-white">{badge.name}</p>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {badge.earned ? 'Earned!' : 'Locked'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Contests Widget */}
      <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg mt-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl animate-staggerFadeIn [animation-delay:600ms]">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Upcoming Contest</h2>
          <p className="text-indigo-700 dark:text-indigo-300">{upcomingContests[0]?.title || 'No upcoming contests'}</p>
          {upcomingContests && <p>Starts in: <CountdownTimer targetDate={upcomingContests[0].startTime} /></p>}
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-semibold transition-transform hover:scale-105 disabled:opacity-50"
          disabled={!upcomingContests}
        >
          Register
        </button>
      </section>
    </main>
  );
}
