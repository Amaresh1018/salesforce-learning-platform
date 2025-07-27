import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
  });

  useEffect(() => {
    if (token && !user) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUser(savedUser);
    }
  }, [token, user]);

  const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    const jwtToken = response.data.token;
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', email);
    setToken(jwtToken);
    setUser(email);
  };

  const register = async (email: string, password: string) => {
    await api.post('/register', { email, password });
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
