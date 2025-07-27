import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/'); 
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-700 mb-4">Welcome, {user}!</p>

        {/* Quiz placeholders */}
        <section className="mb-8">
          <h2 className="font-semibold text-xl mb-4">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded text-center">Quiz 1: Basics</div>
            <div className="bg-blue-100 p-4 rounded text-center">Quiz 2: Advanced</div>
            <div className="bg-blue-100 p-4 rounded text-center">Quiz 3: Interview Prep</div>
          </div>
        </section>

        {/* Leaderboard placeholders */}
        <section>
          <h2 className="font-semibold text-xl mb-4">Leaderboard</h2>
          <ul className="bg-gray-100 p-4 rounded space-y-2">
            <li className="flex justify-between">1. UserA - 950 points</li>
            <li className="flex justify-between">2. UserB - 820 points</li>
            <li className="flex justify-between">3. {user} - 500 points</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
