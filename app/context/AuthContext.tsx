"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { accountsDB, UserAccount } from '../utils/accountsDB';

// Define the shape of the auth context
interface AuthContextType {
  user: Partial<UserAccount> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: UserAccount) => Promise<boolean>;
  updateProfile: (data: Partial<UserAccount>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  updateProfile: async () => false,
  changePassword: async () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Partial<UserAccount> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const userProfile = accountsDB.getUserProfile(loggedInUser);
          if (userProfile) {
            setUser(userProfile);
          } else {
            // If the user doesn't exist anymore, clear the login
            localStorage.removeItem('loggedInUser');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // We need to check on the client side
    if (typeof window !== 'undefined') {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const isValid = accountsDB.validateLogin(username, password);
      
      if (isValid) {
        localStorage.setItem('loggedInUser', username);
        const userProfile = accountsDB.getUserProfile(username);
        setUser(userProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    router.push('/login');
  };

  // Register function
  const register = async (userData: UserAccount): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = accountsDB.saveAccount(userData);
      
      if (success) {
        // Auto login after successful registration
        localStorage.setItem('loggedInUser', userData.username);
        const userProfile = accountsDB.getUserProfile(userData.username);
        setUser(userProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<UserAccount>): Promise<boolean> => {
    if (!user?.username) return false;
    
    setIsLoading(true);
    try {
      const success = accountsDB.updateUserProfile(user.username, data);
      
      if (success) {
        // Refresh user data
        const userProfile = accountsDB.getUserProfile(user.username);
        setUser(userProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user?.username) return false;
    
    setIsLoading(true);
    try {
      const success = accountsDB.changePassword(user.username, currentPassword, newPassword);
      return success;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Computed property for isAuthenticated
  const isAuthenticated = !!user;

  // Create the context value object
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 