"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  isAuthenticated,
  getUserRole,
  getUserId,
  getUserEmail,
  logout,
} from "@/lib/auth";

interface AuthContextType {
  isSignedIn: boolean;
  userId: string | null;
  userRole: string | null;
  email: string | null;
  signOut: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  userId: null,
  userRole: null,
  email: null,
  signOut: () => {},
  refreshAuth: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const refreshAuth = () => {
    setIsSignedIn(isAuthenticated());
    setUserId(getUserId());
    setUserRole(getUserRole());
    setEmail(getUserEmail());
  };

  useEffect(() => {
    // Initial auth state check
    refreshAuth();

    // Listen for localStorage changes
    const handleStorageChange = () => {
      refreshAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also check periodically for auth changes
    const interval = setInterval(refreshAuth, 5000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const signOut = () => {
    logout();
    refreshAuth();
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn, userId, userRole, email, signOut, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);