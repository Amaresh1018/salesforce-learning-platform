import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import sfCloudImage from '../assets/sf_cloud-removebg-preview.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || error.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-10">
        {/* Left side: Local Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src={sfCloudImage}
            alt="Salesforce Cloud Illustration"
            className="rounded-2xl shadow-2xl w-full max-h-[400px] object-contain animate-fadein"
            loading="lazy"
          />
        </div>

        {/* Right side: Login Form */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md text-white flex flex-col"
        >
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-md text-center">
            Sign in to your account
          </h2>

          {errorMessage && (
            <div className="bg-red-600 bg-opacity-80 rounded-md p-3 mb-4 text-center font-semibold drop-shadow-md">
              {errorMessage}
            </div>
          )}

          {/* Email input */}
          <div className="relative z-0 w-full group mb-8">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-gray-300 text-sm duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Email address
            </label>
          </div>

          {/* Password input */}
          <div className="relative z-0 w-full group mb-10">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className="block py-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute text-gray-300 text-sm duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Password
            </label>

            {/* Toggle password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-3 text-gray-300 hover:text-white focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.233.246-2.414.682-3.51M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 mb-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg font-semibold text-white hover:scale-[1.03] transform transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-2 text-center text-gray-300">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-white font-semibold underline hover:text-pink-400"
            >
              Register
            </button>
          </p>
        </form>
      </div>
      {/* Animation styles for fade-in (optional) */}
      <style>{`
        .animate-fadein {
          animation: fadein 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px);}
          to   { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
}
