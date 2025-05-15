import  { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContext as IAuthContext } from '../types';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  register: async () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, you would validate the password here
      // For demo purposes, we'll just check if the password is 'password'
      if (password !== 'password') {
        throw new Error('Invalid email or password');
      }
      
      // Set the user
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = mockUsers.some(u => u.email === email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        username,
        email,
        avatarUrl: `https://i.pravatar.cc/150?img=${mockUsers.length + 5}`,
        role: 'user'
      };
      
      // Set the user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load user from localStorage on initial render
  useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
 