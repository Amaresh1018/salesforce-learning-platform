// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// type NavbarProps = {
//   dark: boolean;
//   toggleDark: () => void;
// };

// export default function Navbar({ dark, toggleDark }: NavbarProps) {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   if (['/login', '/register'].includes(location.pathname)) return null; // You can comment this line to always show Navbar

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-opacity-20 backdrop-blur-md border-b border-white/10 shadow-md z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
//         <div
//           onClick={() => navigate('/')}
//           className="cursor-pointer font-bold text-lg tracking-wide"
//         >
//           Salesforce Decode
//         </div>
//         <div className="space-x-6 flex items-center">
//           <Link to="/" className="hover:underline font-semibold">Home</Link>
//           {user ? (
//             <>
//               <Link to="/dashboard" className="hover:underline font-semibold">Dashboard</Link>
//               <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:underline font-semibold">Login</Link>
//               <Link to="/register" className="hover:underline font-semibold">Register</Link>
//             </>
//           )}
//           <button
//             onClick={toggleDark}
//             className="ml-3 px-2 rounded hover:bg-black/10 transition"
//             aria-label="Toggle dark mode"
//           >
//             {dark ? (
//               <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
//                 <path d="M12 3v1m0 16v1m8.485-10.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 4.222l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             ) : (
//               <svg className="w-7 h-7 text-gray-200" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
//                 <path d="M21 12.79A9 9 0 1111.21 3c0 .24 0 .49.01.73A7.5 7.5 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }


import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type NavbarProps = {
  dark: boolean;
  toggleDark: () => void;
};

export default function Navbar({ dark, toggleDark }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-20 backdrop-blur-md border-b border-white/10 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer font-bold text-lg tracking-wide"
          role="button"
          tabIndex={0}
          aria-label="Navigate to home"
        >
          Salesforce Decode
        </div>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:underline font-semibold">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline font-semibold">Dashboard</Link>
              <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline font-semibold">Login</Link>
              <Link to="/register" className="hover:underline font-semibold">Register</Link>
            </>
          )}
          <button
            onClick={toggleDark}
            className="ml-3 px-2 rounded hover:bg-black/10 transition"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m8.485-10.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 4.222l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-gray-200" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3c0 .24 0 .49.01.73A7.5 7.5 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
