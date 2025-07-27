// ... existing imports
import { useAuth } from './context/AuthContext';  // Add this
import { Link } from 'react-router-dom';

function App() {
  const { user } = useAuth();  // Add this

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Salesforce Decode</h1>
          <div className="space-x-4">
            {user ? (
              <>
                <span>Welcome, {user}</span>
                <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-center mt-20">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h1>
          <p className="text-gray-600">Day 3: Dashboard Ready</p>  // Update this line
        </div>
      </div>
    </div>
  );
}
export default App;