"use client";
import { useState } from "react";
import { useAuth } from '@/context/AuthContext';

export const useLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("useLogin:", { isAuthenticated });

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  

  return { handleLogin, isLoading, error, isAuthenticated };
};