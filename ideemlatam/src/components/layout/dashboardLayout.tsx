// // src/layouts/DashboardLayout.tsx
// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/router"
// import { useAuth } from "@/context/AuthContext"
// import Topbar from "@/components/layout/topbar"
// import {
//   ChevronDown,
//   ChevronUp,
//   Menu,
//   X,
//   UserCircle,
//   LogOut,
// } from "lucide-react"
// import clsx from "clsx"

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter()
//   const { user, isAuthenticated, isLoaded, logout } = useAuth()
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

//   useEffect(() => {
//     if (isLoaded && !isAuthenticated) {
//       router.push("/login")
//     }
//   }, [isLoaded, isAuthenticated, router])

//   if (!isLoaded || !user) return null

//   const groupedRoles = user.perfil.roles.reduce((acc: Record<string, any[]>, role) => {
//     const key = role.titulo || "Sin categoría"
//     if (!acc[key]) acc[key] = []
//     acc[key].push(role)
//     return acc
//   }, {})

//   const toggleGroup = (groupTitle: string) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [groupTitle]: !prev[groupTitle],
//     }))
//   }

//   const handleLogout = () => logout()

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className={clsx(
//   "bg-white shadow-xl h-screen transition-all duration-300 flex flex-col",
//   sidebarOpen ? "w-64" : "w-16"
// )}>
//   {/* Top */}
//   <div className="p-4 flex items-center justify-between">
//     {sidebarOpen ? (
//       <img
//         src="https://ideemllc.com/wp-content/uploads/2022/02/LogoIDEEM_Dark.png"
//         alt="IDEEM Logo"
//         className="h-10 mx-auto"
//       />
//     ) : (
//       <button onClick={() => setSidebarOpen(true)} className="mx-auto">
//         <Menu size={20} className="text-customBlue" />
//       </button>
//     )}

//     {sidebarOpen && (
//       <button onClick={() => setSidebarOpen(false)} className="text-customBlue">
//         <X size={20} />
//       </button>
//     )}
//   </div>

//   {/* Navigation */}
//   <nav className="flex-1 overflow-y-auto px-2">
//     {Object.entries(groupedRoles).map(([title, roles]) => (
//       <div key={title} className="mb-2">
//         {sidebarOpen && (
//           <button
//             onClick={() => toggleGroup(title)}
//             className="w-full flex justify-between items-center p-2 text-customBlue hover:bg-customSkyBluemid/20 rounded-lg"
//           >
//             <span className="text-left text-sm font-medium truncate">
//               {title}
//             </span>
//             {expandedGroups[title] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>
//         )}

//         {(expandedGroups[title] || !sidebarOpen) && (
//           <div className={clsx(
//             sidebarOpen ? "ml-4" : "flex flex-col items-center",
//             "border-l-2 border-customSkyBluemid/30"
//           )}>
//             {roles.map(role => (
//               <Link
//                 key={role.codigo}
//                 href={role.comando || "#"}
//                 className={clsx(
//                   "flex items-center p-2 text-sm hover:bg-customSkyBluemid/10 rounded-lg transition-colors",
//                   sidebarOpen
//                     ? "text-customBluemid hover:text-customBlue"
//                     : "justify-center text-customBlue"
//                 )}
//               >
//                 {/* Icono por rol, default si no hay */}
//                 <span className="mr-2">
//                   {/* Podés mapear role.nombre a un ícono real más adelante */}
//                   📁
//                 </span>
//                 {sidebarOpen && <span>{role.nombre}</span>}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     ))}
//   </nav>

//   {/* Logout */}
//   <button
//     onClick={handleLogout}
//     className={clsx(
//       "mt-auto mb-4 mx-2 flex items-center text-customBlue hover:bg-customSkyBluemid/20 p-2 rounded-lg",
//       sidebarOpen ? "gap-2 justify-start" : "justify-center"
//     )}
//   >
//     <LogOut size={18} />
//     {sidebarOpen && <span>Cerrar sesión</span>}
//   </button>
// </aside>



//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         {/* <header className="bg-white shadow-xl rounded-lg p-6 mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 rounded-full bg-customSkyBluemid flex items-center justify-center text-white font-bold">
//               {user.nombre[0]}{user.apellido[0]}
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-customBlue">{user.nombre} {user.apellido}</h1>
//               <p className="text-customBluemid text-sm">{user.profesion.nombre}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-customBlue">
//             <UserCircle size={20} />
//             <span className="font-medium">{user.perfil.nombre}</span>
//           </div>
//         </header> */}
//           <Topbar /> 
//         {children}
//       </main>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "@/context/AuthContext"
import Topbar from "@/components/layout/topbar"
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  LogOut,
  Folder,
  File,
} from "lucide-react"
import clsx from "clsx"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isAuthenticated, isLoaded, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoaded, isAuthenticated, router])

  if (!isLoaded || !user) return null

  // Agrupar roles por padre
  const padres = user.perfil.roles.filter((role) => role.comando === null)
  const hijos = user.perfil.roles.filter((role) => role.comando !== null)

  const groupedRoles: Record<string, any[]> = {}

  padres.forEach((padre) => {
    const hijosDePadre = hijos.filter((hijo) => hijo.rol === padre.codigo)
    if (hijosDePadre.length > 0) {
      groupedRoles[padre.nombre] = hijosDePadre
    }
  })

  // Si no hay padres o quedan sueltos, los agrupamos como "Sin Grupo"
  const hijosSinGrupo = hijos.filter((hijo) => !padres.some((padre) => padre.codigo === hijo.rol))
  if (hijosSinGrupo.length > 0) {
    groupedRoles["Sin Grupo"] = hijosSinGrupo
  }

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }))
  }

  const handleLogout = () => logout()

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-white shadow-xl h-screen transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Top */}
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <img
              src="https://ideemllc.com/wp-content/uploads/2022/02/LogoIDEEM_Dark.png"
              alt="IDEEM Logo"
              className="h-10 mx-auto"
            />
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="mx-auto">
              <Menu size={20} className="text-customBlue" />
            </button>
          )}

          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="text-customBlue">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2">
          {Object.entries(groupedRoles).map(([groupTitle, roles]) => (
            <div key={groupTitle} className="mb-2">
              {sidebarOpen && (
                <button
                  onClick={() => toggleGroup(groupTitle)}
                  className="w-full flex justify-between items-center p-2 text-customBlue hover:bg-customSkyBluemid/20 rounded-lg"
                >
                  <span className="text-left text-sm font-medium truncate">{groupTitle}</span>
                  {expandedGroups[groupTitle] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              )}

              {(expandedGroups[groupTitle] || !sidebarOpen) && (
                <div
                  className={clsx(
                    sidebarOpen ? "ml-4" : "flex flex-col items-center",
                    "border-l-2 border-customSkyBluemid/30"
                  )}
                >
                  {roles.map((role) => (
                    <Link
                      key={role.codigo}
                      href={role.comando}
                      className={clsx(
                        "flex items-center p-2 text-sm hover:bg-customSkyBluemid/10 rounded-lg transition-colors",
                        sidebarOpen
                          ? "text-customBluemid hover:text-customBlue"
                          : "justify-center text-customBlue"
                      )}
                    >
                      <File size={16} className="mr-2" />
                      {sidebarOpen && <span>{role.nombre}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={clsx(
            "mt-auto mb-4 mx-2 flex items-center text-customBlue hover:bg-customSkyBluemid/20 p-2 rounded-lg",
            sidebarOpen ? "gap-2 justify-start" : "justify-center"
          )}
        >
          <LogOut size={18} />
          {sidebarOpen && <span>Cerrar sesión</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Topbar />
        {children}
      </main>
    </div>
  )
}
