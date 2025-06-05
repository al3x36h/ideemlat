

// "use client";

// import {
//   createContext,
//   useContext,
//   ReactNode,
//   useState,
//   useEffect,
// } from "react";
// import { useRouter } from "next/router";
// import { User } from "@/interfaces/userData";
// import { httpClient } from "@/api/httpClient";
// import { ENDPOINTS } from "@/api/endpoints";
// import { hashSHA256 } from "@/util/hash";

// // ✅ Añadido setUser al tipo
// type AuthContextType = {
//   user: User | null;
//   setUser: (user: User) => void;
//   isAuthenticated: boolean;
//   isLoaded: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const router = useRouter();

//   // Carga inicial de sesión
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const userData = localStorage.getItem("userData");

//     if (token && userData) {
//       setUser(JSON.parse(userData));
//     }
//     setIsLoaded(true);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const hashedPassword = await hashSHA256(password);
//     const hashedHex = await hashSHA256(password);
//     const hashedBase64 = Buffer.from(hashedHex, "hex").toString("base64");

//     const response = await httpClient<User>(ENDPOINTS.LOGIN(), {
//       method: "POST",
//       body: JSON.stringify({ usuario: email, clave: hashedBase64, tipo:4 }),
//     });

//     console.log("📤 Enviando POST a", ENDPOINTS.LOGIN(), "con body:", {
//       email,
//       hashedBase64,
//     });

//     localStorage.setItem("authToken", response.sesion);
//     localStorage.setItem("userData", JSON.stringify(response));
//     setUser(response);
//     router.push("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userData");
//     setUser(null);
//     router.push("/login");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser, // ✅ Añadido al context
//         login,
//         logout,
//         isAuthenticated: !!user,
//         isLoaded,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context)
//     throw new Error("useAuth debe usarse dentro de un AuthProvider");
//   return context;
// };


// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { User } from "@/interfaces/userData";
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { hashSHA256 } from "@/util/hash";

// ✅ Ahora login recibe email, password y role
type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  isLoaded: boolean;
  login: (email: string, password: string, role: number) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Carga inicial de sesión
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoaded(true);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: number
  ): Promise<void> => {
    // Hash de la contraseña
    const hashedHex = await hashSHA256(password);
    const hashedBase64 = Buffer.from(hashedHex, "hex").toString("base64");

    // Envía el rol dinámico en la propiedad "tipo"
    const response = await httpClient<User>(ENDPOINTS.LOGIN(), {
      method: "POST",
      body: JSON.stringify({
        usuario: email,
        clave: hashedBase64,
        tipo: role,
      }),
    });

    console.log(
      "📤 Enviando POST a",
      ENDPOINTS.LOGIN(),
      "con body:",
      {
        usuario: email,
        clave: hashedBase64,
        tipo: role,
      }
    );

    localStorage.setItem("authToken", response.sesion);
    localStorage.setItem("userData", JSON.stringify(response));
    setUser(response);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
