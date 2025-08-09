import { useAuth } from '../context/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();
  // In production, replace with user avatar/xp/streak/etc.
  // Placeholder stats (integrate real data as needed)
  const xp = 1420;
  const streak = 8;

  return (
    <header className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg transition-all duration-300 animate-fadeIn">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md transition-transform hover:scale-105">
          {user ? user[0].toUpperCase() : 'L'}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white drop-shadow">
            Welcome, {user || "Learner"}!
          </h1>
          <p className="text-gray-600 dark:text-indigo-200 mt-1">Here's your Salesforce learning dashboard.</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center transition-transform hover:scale-105">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">XP</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{xp}</p>
        </div>
        <div className="text-center transition-transform hover:scale-105">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Streak</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{streak} days</p>
        </div>
      </div>
    </header>
  );
}
