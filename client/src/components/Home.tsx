import { useNavigate } from 'react-router-dom';
import sfCloudImage from '../assets/sf_cloud.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white flex flex-col">
      {/* Animated Background Circles */}
      <div className="pointer-events-none fixed -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 opacity-30 animate-blob animation-delay-4000"></div>
      <div className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-purple-700 via-pink-700 to-indigo-700 opacity-40 animate-blob animation-delay-2000"></div>

      {/* Container */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-20 relative z-10 gap-12 max-w-7xl">
        {/* Text Section */}
        <section className="flex flex-col max-w-xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-text-glow">
            Decode Salesforce Learning
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">
            Master Salesforce cloud, CRM, and development with dynamic quizzes & real-time leaderboard — all in one sleek platform.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Interactive Quizzes',
                desc: 'Engage with real-world scenarios and challenge your skills.',
                icon: (
                  <svg
                    className="w-10 h-10 text-indigo-400 drop-shadow-md transition-transform transform hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20h9" />
                    <path d="M12 4v16" />
                    <circle cx={6} cy={17} r={4} />
                    <path d="M6 3v3" />
                  </svg>
                ),
              },
              {
                title: 'Real-Time Leaderboard',
                desc: 'See how you stack up against other Salesforce enthusiasts.',
                icon: (
                  <svg
                    className="w-10 h-10 text-pink-400 drop-shadow-md transition-transform transform hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v18" />
                    <rect x={3} y={9} width={18} height={6} rx={2} ry={2} />
                  </svg>
                ),
              },
              {
                title: 'Simple & Secure',
                desc: 'Easy to use platform secured with modern authentication.',
                icon: (
                  <svg
                    className="w-10 h-10 text-purple-400 drop-shadow-md transition-transform transform hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:bg-opacity-20 transition duration-300 cursor-default">
                {icon}
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-gray-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl bg-white hover:text-indigo-900 transition focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x opacity-75"></span>
              <span className="relative">Login</span>
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 font-medium rounded-lg border-2 border-white text-white hover:bg-white hover:text-indigo-900 transition"
            >
              Register
            </button>
          </div>
        </section>

        {/* Local Image/Illustration Section */}
        <section className="hidden md:block flex-1 max-w-lg relative">
          {/* Optional overlay for blend if image is non-transparent */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-indigo-900/60 via-purple-900/30 to-blue-900/20 rounded-lg z-10"></div>
          <img
            src={sfCloudImage}
            alt="Salesforce Cloud Illustration"
            className="relative rounded-lg shadow-2xl object-cover w-full max-h-[470px] scale-105 hover:scale-110 transition-transform duration-700 z-20"
            loading="lazy"
            style={{ background: 'linear-gradient(135deg, #212753 0%, #433f91 100%)' }}
          />
        </section>
      </div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .text-glow {
          text-shadow:
            0 0 6px #8b5cf6,
            0 0 12px #8b5cf6,
            0 0 18px #8b5cf6,
            0 0 24px #8b5cf6;
        }
      `}</style>
    </main>
  );
}
