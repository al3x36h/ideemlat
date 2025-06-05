
// // src/components/login/loginForm.tsx
// "use client";

// import { useState } from "react";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { useLogin } from "@/hooks/useLogin";

// export default function LoginForm() {
//   const { handleLogin, isLoading, error } = useLogin();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("▶️ onSubmit fired", { email, password });
//     e.preventDefault();

//     if (!email || !password) {
//       // Puedes personalizar este mensaje o delegarlo al hook
//       return;
//     }

//     await handleLogin(email, password);
//     // La navegación al dashboard la realiza el hook internamente
//   };
// "use client";
// console.log("🔹 LoginForm render");



//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-customBlue to-customSkyBlue">
//       <div className="w-full max-w-4xl mx-4 bg-white shadow-xl rounded-lg p-8 space-y-6">
//         <div className="flex justify-center">
//           <img
//             src="https://ideemllc.com/wp-content/uploads/2022/02/LogoIDEEM_Dark.png"
//             alt="Logo IDEEM"
//             className="h-20 object-contain"
//             loading="lazy"
//           />
//         </div>

//         <form onSubmit={onSubmit} className="space-y-6" noValidate>
//           <div className="space-y-3">
//             <label htmlFor="email" className="text-base font-medium text-customBlue">
//               Correo electrónico
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-customGray">
//                 <Mail size={20} />
//               </span>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Ingrese su correo"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-customSkyBlue/30 rounded-lg pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-customBlue"
//                 disabled={isLoading}
//                 autoComplete="email"
//               />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label htmlFor="password" className="text-base font-medium text-customBlue">
//               Contraseña
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-customGray">
//                 <Lock size={20} />
//               </span>
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Ingrese su contraseña"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-customSkyBlue/30 rounded-lg pl-12 pr-12 py-3 text-base focus:outline-none focus:ring-2 focus:ring-customBlue"
//                 disabled={isLoading}
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-customGray hover:text-customBlue"
//                 aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//                 disabled={isLoading}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-customBlue hover:bg-customBluemid text-white py-3 rounded-lg text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? "Accediendo..." : "Acceder"}
//           </button>

//           {error && (
//             <p className="text-sm text-customPink text-center bg-customPink/10 p-2 rounded border border-customPink/30">
//               {error}
//             </p>
//           )}

//           <div className="text-center text-sm">
//             <a
//               href="#"
//               className="text-customBlue hover:text-customBluemid transition-colors"
//               aria-disabled={isLoading}
//               tabIndex={isLoading ? -1 : 0}
//             >
//               ¿Olvidó su contraseña?
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// src/components/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { User, Users, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const { handleLogin, isLoading, error } = useLogin();

  // 0 = Docente, 1 = Estudiante, 4 = Usuario
  const [tipo, setTipo] = useState<0 | 1 | 4>(0);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("▶️ onSubmit fired", { tipo, usuario, password });

    if (!usuario || !password) return;
    await handleLogin(usuario, password, tipo);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-customBlue to-customSkyBlue">
      <div className="w-full max-w-4xl mx-4 bg-white shadow-xl rounded-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img
            src="https://ideemllc.com/wp-content/uploads/2022/02/LogoIDEEM_Dark.png"
            alt="Logo IDEEM"
            className="h-20 object-contain"
            loading="lazy"
          />
        </div>

        <form onSubmit={onSubmit} className="space-y-6" noValidate>
       

          {/* Campo de Usuario */}
          <div className="space-y-3">
            <label htmlFor="usuario" className="text-base font-medium text-customBlue">
              Usuario
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-customGray">
                <User size={20} />
              </span>
              <input
                id="usuario"
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={isLoading}
                autoComplete="username"
                className="w-full border border-customSkyBlue/30 rounded-lg pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-customBlue"
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div className="space-y-3">
            <label htmlFor="password" className="text-base font-medium text-customBlue">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-customGray">
                <Lock size={20} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full border border-customSkyBlue/30 rounded-lg pl-12 pr-12 py-3 text-base focus:outline-none focus:ring-2 focus:ring-customBlue"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-customGray hover:text-customBlue"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

             {/* Select de Rol */}
             <div className="space-y-3">
            <label htmlFor="tipo" className="text-base font-medium text-customBlue">
              Rol
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-customGray">
                <Users size={20} />
              </span>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(parseInt(e.target.value, 10) as 0 | 1 | 4)}
                disabled={isLoading}
                className="w-full border border-customSkyBlue/30 rounded-lg pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-customBlue bg-white appearance-none"
              >
                <option value={0}>Docente</option>
                <option value={1}>Estudiante</option>
                <option value={4}>Usuario</option>
              </select>
            </div>
          </div>

          {/* Botón de Acceso */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-customBlue hover:bg-customBluemid text-white py-3 rounded-lg text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Accediendo..." : "Acceder"}
          </button>

          {error && (
            <p className="text-sm text-customPink text-center bg-customPink/10 p-2 rounded border border-customPink/30">
              {error}
            </p>
          )}

          <div className="text-center text-sm">
            <a
              href="#"
              tabIndex={isLoading ? -1 : 0}
              aria-disabled={isLoading}
              className="text-customBlue hover:text-customBluemid transition-colors"
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
