import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');  // Redirect if not logged in
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
        <p className="text-gray-700 mb-4">Welcome, {user}!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="font-semibold">Quizzes</h2>
            <p>Start your Salesforce training here.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="font-semibold">Leaderboard</h2>
            <p>See top performers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
