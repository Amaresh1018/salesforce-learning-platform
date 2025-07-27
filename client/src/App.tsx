// import { useState, useEffect } from 'react';
// import { useAuth } from './context/AuthContext';  // For user state
// import { Link } from 'react-router-dom';

// function App() {
//   const { user } = useAuth();

//   // Manage theme state
//   const [dark, setDark] = useState(() => {
//     // Initial theme: check system preference or saved localStorage
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('dark-theme');
//       if (saved !== null) return saved === 'true';
//       // fallback to system preference
//       return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     }
//     return false; // default light
//   });

//   // Side effect: add/remove dark class to <html> element and save preference
//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (dark) {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//     localStorage.setItem('dark-theme', dark.toString());
//   }, [dark]);

//   // Toggle theme handler
//   const toggleTheme = () => setDark(prev => !prev);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
//       <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center max-w-7xl mx-auto">
//         <h1 className="text-xl font-bold text-gray-900 dark:text-white">Salesforce Decode</h1>

//         <div className="flex items-center space-x-4">
//           {user ? (
//             <>
//               <span className="text-gray-800 dark:text-gray-200">Welcome, {user}</span>
//               <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">Dashboard</Link>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link>
//               <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</Link>
//             </>
//           )}

//           {/* Dark theme toggle button */}
//           <button
//             aria-label="Toggle Dark Mode"
//             onClick={toggleTheme}
//             className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//             title={dark ? "Switch to light mode" : "Switch to dark mode"}
//           >
//             {dark ? (
//               // Sun Icon for light mode
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.485-10.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 4.222l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//             ) : (
//               // Moon icon for dark mode
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3c0 .24 0 .49.01.73a7.5 7.5 0 009.78 9.06z" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </nav>

//       <div className="flex items-center justify-center mt-20">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center transition-colors duration-500">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Welcome!</h1>
//           <p className="text-gray-600 dark:text-gray-400">Day 3: Dashboard Ready</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Remove if not using Footer
import Routes from './routes'; // Your route definitions/pages

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dark-theme');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('dark-theme', dark.toString());
  }, [dark]);

  function toggleDark() {
    setDark((prev) => !prev);
  }

  return (
    <AuthProvider>
      <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 text-white">
        <Navbar dark={dark} toggleDark={toggleDark} />
        <main>
          <Routes />
        </main>
        <Footer /> {/* Remove if not using */}
      </div>
    </AuthProvider>
  );
}

