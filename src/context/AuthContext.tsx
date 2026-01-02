import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  LoginPayload,
  RegisterPayload,
  VerifyOtpPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload
} from '@/types';
import { authApi } from '@/api/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  verifyOtp: (payload: VerifyOtpPayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        try {
          const userData = await authApi.getProfile();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error("Session expired or invalid token", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const data = await authApi.login(payload);
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      await authApi.register(payload);
    } catch (error: any) {
      const message = error.response?.data?.email
        ? error.response.data.email[0]
        : (error.response?.data?.error || 'Registration failed');
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (payload: VerifyOtpPayload) => {
    setIsLoading(true);
    try {
      await authApi.verifyOtp(payload);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    setIsLoading(true);
    try {
      await authApi.forgotPassword(payload);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    setIsLoading(true);
    try {
      await authApi.resetPassword(payload);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email: string) => {
    try {
      await authApi.resendOtp(email);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to resend OTP');
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userData = await authApi.getProfile();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ? { ...user, name: user.name || user.first_name || user.username } : null,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        verifyOtp,
        forgotPassword,
        resetPassword,
        resendOtp,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
