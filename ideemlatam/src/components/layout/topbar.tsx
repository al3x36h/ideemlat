// src/components/layout/Topbar.tsx
"use client"

import { useAuth } from "@/context/AuthContext"
import { LogOut, Settings, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => setOpen(!open)
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow px-6 py-3 flex items-center justify-betwee rounded-full">
      {/* Buscador */}
      <div className="w-full max-w-md mx-auto hidden md:block">
        {/* <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-customBlue"
        /> */}
      </div>

      {/* Perfil / Menú */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="h-10 w-10 rounded-full bg-customSkyBluemid text-white flex items-center justify-center font-semibold hover:ring-2 ring-customSkyBlue"
        >
          {user?.nombre[0]}{user?.apellido[0]}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <button onClick={() => router.push("/perfil")}  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
              <User size={16} /> Perfil
            </button>
            <button onClick={() => router.push("/password")}  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
              
              <Settings size={16} /> Configuración
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
