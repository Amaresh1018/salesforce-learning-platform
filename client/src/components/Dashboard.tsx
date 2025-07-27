import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Quiz {
  _id: string;
  title: string;
  description?: string;  // if available
}

interface LeaderboardEntry {
  username: string;
  points: number;
}

function Dashboard() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState<boolean>(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState<boolean>(false);
  const [errorQuizzes, setErrorQuizzes] = useState<string | null>(null);
  const [errorLeaderboard, setErrorLeaderboard] = useState<string | null>(null);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Axios instance with token in headers (if token exists)
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  // Fetch quizzes from backend
  useEffect(() => {
    if (!user) return;

    async function fetchQuizzes() {
      setLoadingQuizzes(true);
      setErrorQuizzes(null);
      try {
        const res = await api.get<Quiz[]>('/quiz');
        setQuizzes(res.data);
      } catch (error: any) {
        setErrorQuizzes(
          error.response?.data?.error || 'Failed to load quizzes'
        );
      } finally {
        setLoadingQuizzes(false);
      }
    }

    fetchQuizzes();
  }, [user, token]); 

  useEffect(() => {
    if (!user) return;

    async function fetchLeaderboard() {
      setLoadingLeaderboard(true);
      setErrorLeaderboard(null);
      try {
        const res = await api.get<LeaderboardEntry[]>('/leaderboard');
        setLeaderboard(res.data);
      } catch (error: any) {
        setErrorLeaderboard(
          error.response?.data?.error || 'Failed to load leaderboard'
        );
      } finally {
        setLoadingLeaderboard(false);
      }
    }

    fetchLeaderboard();
  }, [user, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-700 mb-6">Welcome, {user}!</p>

        {/* Quizzes Section */}
        <section className="mb-8">
          <h2 className="font-semibold text-xl mb-4">Available Quizzes</h2>

          {loadingQuizzes && <p>Loading quizzes...</p>}
          {errorQuizzes && (
            <p className="text-red-600">Error: {errorQuizzes}</p>
          )}

          {!loadingQuizzes && !errorQuizzes && quizzes.length === 0 && (
            <p>No quizzes available.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
                // For now, just alert title on click - replace with navigation as needed
                onClick={() => alert(`Selected quiz: ${quiz.title}`)}
              >
                <h3 className="font-semibold text-lg">{quiz.title}</h3>
                {quiz.description && (
                  <p className="mt-2 text-gray-700">{quiz.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard Section */}
        <section>
          <h2 className="font-semibold text-xl mb-4">Leaderboard</h2>

          {loadingLeaderboard && <p>Loading leaderboard...</p>}
          {errorLeaderboard && (
            <p className="text-red-600">Error: {errorLeaderboard}</p>
          )}

          {!loadingLeaderboard && !errorLeaderboard && leaderboard.length === 0 && (
            <p>No leaderboard data available.</p>
          )}

          <ul className="bg-gray-100 p-4 rounded space-y-2">
            {leaderboard.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between"
              >
                <span>
                  {index + 1}. {entry.username}
                </span>
                <span>{entry.points} points</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
