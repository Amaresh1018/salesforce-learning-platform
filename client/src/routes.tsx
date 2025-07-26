import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Provides fake auth state
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';  // Added: Your protected dashboard

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },  // Added: Protected route
]);

export default function Routes() {
  return (
    <AuthProvider>  {/* Wraps the entire app for global auth state */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
