// src/pages/_app.tsx
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("👀 AuthProvider mounted – token:", token);

  }, []);
  

  return (
    <AuthProvider>
      <Toaster position="top-center" />

      <Component {...pageProps} />
    </AuthProvider>
  );
}



