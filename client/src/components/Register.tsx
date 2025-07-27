import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import sfCloudImage from '../assets/sf_cloud-removebg-preview.png';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-10">
        {/* Left side: Animated Clouds and Image */}
        <div className="hidden md:flex items-center justify-center relative min-h-[400px]">
          {/* Background Animated Clouds */}
          <Cloud y={40} duration={18} delay={0} scale={1.0} color="#fff" opacity={0.22} />
          <Cloud y={140} duration={25} delay={3} scale={0.8} color="#c7d2fe" opacity={0.16} />
          <Cloud y={80} duration={16} delay={8} scale={0.65} color="#f3f4f6" opacity={0.19} />
          <Cloud y={200} duration={30} delay={5} scale={0.45} color="#a5b4fc" opacity={0.14} />
          {/* Centered Branded Cloud Image (above clouds) */}
          <img
            src={sfCloudImage}
            alt="Salesforce Cloud Illustration"
            className="relative z-10 rounded-2xl shadow-2xl w-4/5 max-h-[320px] object-contain animate-fadein"
            loading="lazy"
          />
        </div>

        {/* Right side: Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md text-white flex flex-col"
          autoComplete="on"
        >
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-md text-center">
            Create your account
          </h2>
          {errorMessage && (
            <div className="bg-red-600 bg-opacity-80 rounded-md p-3 mb-4 text-center font-semibold drop-shadow-md">
              {errorMessage}
            </div>
          )}
          {/* Email */}
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
              onChange={e => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-gray-300 text-sm pointer-events-none duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0]
                peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100
                peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Email address
            </label>
          </div>
          {/* Password */}
          <div className="relative z-0 w-full group mb-8">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className="block py-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute text-gray-300 text-sm pointer-events-none duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0]
                peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100
                peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
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
          {/* Confirm Password */}
          <div className="relative z-0 w-full group mb-10">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              className="block py-3 px-0 w-full text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute text-gray-300 text-sm pointer-events-none duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0]
                peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100
                peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirm(prev => !prev)}
              className="absolute right-0 top-3 text-gray-300 hover:text-white focus:outline-none"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showConfirm ? (
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
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg font-semibold text-white hover:scale-[1.03] transform transition duration-300"
          >
            Register
          </button>
          {/* Login Link */}
          <p className="mt-2 text-center text-gray-300">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-white font-semibold underline hover:text-pink-400"
            >
              Login
            </button>
          </p>
        </form>
      </div>
      {/* Animations and autofill fixes */}
      <style>{`
        .animate-fadein {
          animation: fadein 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px);}
          to   { opacity: 1; transform: none;}
        }
        @keyframes cloudfloat {
          from { transform: translateX(-120px);}
          to   { transform: translateX(580px);}
        }
        input:-webkit-autofill {
          -webkit-text-fill-color: #fff;
          transition: background-color 5000s ease-in-out 0s;
        }
        input:-webkit-autofill ~ label,
        input:not(:placeholder-shown) ~ label,
        input:focus ~ label {
          transform: translateY(-1.5rem) scale(0.75);
          color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
}

// Cloud drifting SVG animation component
type CloudProps = {
  y: number
  duration: number
  delay: number
  scale: number
  color?: string
  opacity?: number
};
function Cloud({ y, duration, delay, scale, color = '#fff', opacity = 0.2 }: CloudProps) {
  return (
    <svg
      viewBox="0 0 240 90"
      style={{
        position: 'absolute',
        left: -120,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        animation: `cloudfloat ${duration}s linear ${delay}s infinite`,
        zIndex: 1,
      }}
      width={180}
      height={70}
      fill="none"
    >
      <ellipse cx="60" cy="60" rx="60" ry="25" fill={color} />
      <ellipse cx="140" cy="50" rx="60" ry="23" fill={color} />
      <ellipse cx="115" cy="33" rx="45" ry="16" fill={color} />
    </svg>
  );
}
