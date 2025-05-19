
// // src/components/dashboard/Dashboard.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";               // Pages Router → next/router
// import { useAuth } from "@/context/AuthContext";
// import { ChevronDown, ChevronUp, UserCircle, LogOut } from "lucide-react";

// export default function Dashboard() {
//   const router = useRouter();
//   const { user, isAuthenticated, isLoaded, logout } = useAuth();
//   const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

//   // 1) Esperar a que el contexto cargue, luego redirigir si no hay sesión
//   useEffect(() => {
//     if (isLoaded && !isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isLoaded, isAuthenticated, router]);

//   // 2) Mientras estamos cargando la sesión, no renderizamos nada (o muestra un spinner)
//   if (!isLoaded) {
//     return null;
//   }

//   // 3) Si ya cargó y no hay usuario, tampoco renderizamos (la redirección acaba de dispararse)
//   if (!user) {
//     return null;
//   }

//   // Agrupar roles por título
//   const groupedRoles = user.perfil.roles.reduce((acc: Record<string, any[]>, role) => {
//     const key = role.titulo || "Sin categoría";
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(role);
//     return acc;
//   }, {});

//   const toggleGroup = (groupTitle: string) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [groupTitle]: !prev[groupTitle],
//     }));
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-customBlue to-customSkyBlue flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-xl h-screen p-4 flex flex-col">
//         <div className="mb-8">
//           <img
//             src="https://ideemllc.com/wp-content/uploads/2022/02/LogoIDEEM_Dark.png"
//             alt="IDEEM Logo"
//             className="h-12 mx-auto"
//           />
//         </div>

//         <nav className="flex-1 overflow-y-auto">
//           {Object.entries(groupedRoles).map(([title, roles]) => (
//             <div key={title} className="mb-2">
//               <button
//                 onClick={() => toggleGroup(title)}
//                 className="w-full flex justify-between items-center p-2 text-customBlue hover:bg-customSkyBluemid/20 rounded-lg"
//               >
//                 <span className="font-medium">{title}</span>
//                 {expandedGroups[title] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </button>

//               {expandedGroups[title] && (
//                 <div className="ml-4 border-l-2 border-customSkyBluemid/30">
//                   {roles.map(role => (
//                     <Link
//                       key={role.codigo}
//                       href={role.comando || "#"}
//                       className="block p-2 text-sm text-customBluemid hover:text-customBlue hover:bg-customSkyBluemid/10 rounded-lg transition-colors"
//                     >
//                       {role.nombre}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="mt-auto flex items-center gap-2 w-full p-2 text-customBlue hover:bg-customSkyBluemid/20 rounded-lg"
//         >
//           <LogOut size={18} />
//           Cerrar sesión
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {/* Header */}
//         <header className="bg-white shadow-xl rounded-lg p-6 mb-8 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 rounded-full bg-customSkyBluemid flex items-center justify-center text-white font-bold">
//               {user.nombre[0]}
//               {user.apellido[0]}
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-customBlue">
//                 {user.nombre} {user.apellido}
//               </h1>
//               <p className="text-customBluemid text-sm">{user.profesion.nombre}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-customBlue">
//             <UserCircle size={20} />
//             <span className="font-medium">{user.perfil.nombre}</span>
//           </div>
//         </header>

//         {/* Personal & Geographic Info */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white shadow-xl rounded-lg p-6">
//             <h2 className="text-lg font-bold text-customBlue mb-4">Información Personal</h2>
//             <div className="space-y-2 text-sm">
//               <p><strong>Correo:</strong> {user.correo}</p>
//               <p><strong>Teléfono:</strong> {user.telefono || "No registrado"}</p>
//               <p><strong>Fecha Nacimiento:</strong> {user.fecha_nacimiento || "No registrada"}</p>
//             </div>
//           </div>
//           <div className="bg-white shadow-xl rounded-lg p-6">
//             <h2 className="text-lg font-bold text-customBlue mb-4">Información Geográfica</h2>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <p><strong>País:</strong> {user.pais.nombre}</p>
//               <p><strong>Código ISO:</strong> {user.pais.codigo_iso}</p>
//               <p><strong>Prefijo:</strong> {user.pais.codigo_telefono}</p>
//               <p><strong>Formato Teléfono:</strong> {user.pais.expresion}</p>
//             </div>
//           </div>
//         </section>

//         {/* Active Session */}
//         <section className="bg-white shadow-xl rounded-lg p-6 mt-6">
//           <h2 className="text-lg font-bold text-customBlue mb-2">Sesión Activa</h2>
//           <p className="text-sm"><strong>ID Sesión:</strong> {user.sesion}</p>
//         </section>
//       </main>
//     </div>
//   );
// }

// src/components/dashboard/Dashboard.tsx

"use client";

import DashboardLayout from "@/components/layout/dashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Aquí solo va el contenido del dashboard, sin sidebar ni header */}
      {/* TODO: mover el contenido de info personal, país, sesión activa acá */}
    </DashboardLayout>
  )
}
