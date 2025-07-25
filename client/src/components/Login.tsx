import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Add this import for fake auth

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // Get login function from context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);  // "Log in" the user (saves to state/local storage)
    navigate('/');  // Redirect to home
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
