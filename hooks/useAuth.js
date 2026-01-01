'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;   
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
  const initAuth = async () => {
    const token = localStorage.getItem('homedecor_token');

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/user/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Unauthorized');

      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Auth init failed:', err);
      localStorage.removeItem('homedecor_token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

    initAuth();
  }, []);


  // 2. Login Function
  const login = async (emailOrUsername, password) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // PERBAIKAN DISINI:
        // Gunakan parameter 'emailOrUsername' dan kirim sebagai key 'username'
        // (karena backend/plugin JWT WordPress biasanya butuh key 'username')
        body: JSON.stringify({ 
            username: emailOrUsername, 
            password: password 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('homedecor_token', data.token);

        // fetch user details
        const userRes = await fetch('/api/user/details', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = await userRes.json();

        setUser(userData.user);
        setIsAuthenticated(true);

        return { success: true };
      }
      else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      // Pesan error ini muncul karena ReferenceError 'email is not defined' sebelumnya
      return { success: false, error: 'Connection failed. Please check your console.' };
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Register Function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
  localStorage.setItem('homedecor_token', data.token);

  // fetch user details
  const userRes = await fetch('/api/user/details', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

      if (!userRes.ok) throw new Error('Failed to fetch user');

      const userData = await userRes.json();

      setUser(userData.user);
      setIsAuthenticated(true);

      return { success: true };
      }
      else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Logout Function
  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    localStorage.removeItem('homedecor_token'); 
    setUser(null);
    setIsAuthenticated(false);
  };


  // Helper untuk mendapatkan token (berguna untuk API call lain)
  const getToken = () => {
     if (typeof window !== 'undefined') {
         return localStorage.getItem('homedecor_token');
     }
     return null;
  };

   const refreshUser = async () => {
    const token = localStorage.getItem('homedecor_token');
    if (!token) return;

    try {
      const res = await fetch('/api/user/details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Unauthorized');

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    getToken,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};