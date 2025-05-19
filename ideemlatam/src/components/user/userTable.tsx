// src/components/user/UserTable.tsx
"use client";

import { useState } from "react";
import { useUserPayload } from "@/hooks/useUserPayload";
import UserForm from "@/components/user/userForm";
import UserSkeleton from "@/components/user/userSkeleton";
import Modal from "@/components/ui/modal";
import type { UserPayload } from "@/interfaces/userPayload";

export default function UserTable() {
  const {
    filteredUsers,
    loading,
    addUser,
    editUser,
    searchTerm,
    setSearchTerm,
  } = useUserPayload();

  const [editing, setEditing] = useState<UserPayload | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginated = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) return <UserSkeleton />;

  const handleEdit = (u: UserPayload) => {
    setEditing(u);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: UserPayload) => {
    if (editing) {
      await editUser(data);
    } else {
      await addUser(data);
    }
    setShowForm(false);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Buscador y botón de agregar */}
      <div className="flex items-center justify-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar usuario..."
          className="pl-10 border p-2 rounded w-2/3 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
  
      </div>

      {/* Modal del formulario */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <UserForm
          defaultData={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      </Modal>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-customBluemid/10 text-customBlue uppercase text-left text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">País</th>
              <th className="px-4 py-3">Profesión</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((u) => (
              <tr key={u.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-2">{u.nombre} {u.apellido}</td>
                <td className="px-4 py-2">{u.nombreUsuario}</td>
                <td className="px-4 py-2">{u.correo}</td>
                 <td className="px-4 py-2">{u.estado ? "Activo" : "Inactivo"}</td>  
                 <td className="px-4 py-2">{u.pais.nombre}</td>
                <td className="px-4 py-2">{u.profesion.nombre}</td>
                <td className="px-4 py-2">{u.perfil.nombre}</td>  
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-customBlue hover:bg-customBluemid text-white text-xs px-3 py-1 rounded-md shadow-sm"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
      <button
          onClick={handleAdd}
          className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded shadow-md"
        >
          + Agregar Usuario
        </button>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Mostrando{" "}
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredUsers.length)}{" "}
          de {filteredUsers.length} usuarios
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
