// src/components/student/StudentTable.tsx
"use client";

import { useState } from "react";
import { useStudentData } from "@/hooks/useStudentData";
import StudentForm from "@/components/student/studentForm";
import StudentSkeleton from "@/components/student/studentSkeleton";
import Modal from "@/components/ui/modal";
import type { StudentData } from "@/interfaces/student";
import { useCountry } from "@/hooks/useCountry";
import { useProfession } from "@/hooks/useProfession";
import { useProfile } from "@/hooks/useProfile";

export default function StudentTable() {
  const {
    studentDatas,
    filteredStudentData,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addStudentData,
    editStudentData,
  } = useStudentData();

  const { countries } = useCountry();
  const { professions } = useProfession();
  const { profiles } = useProfile();

  const [editing, setEditing] = useState<StudentData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredStudentData.length / perPage);
  const paginated = filteredStudentData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) return <StudentSkeleton />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const handleEdit = (s: StudentData) => {
    setEditing(s);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: StudentData) => {
    if (editing) await editStudentData(data);
    else await addStudentData(data);
    setShowForm(false);
    setPage(1);
  };

  const getName = (
    val: number | { codigo: number; nombre: string },
    list: { codigo: number; nombre: string }[]
  ) => {
    if (typeof val === "object") return val.nombre;
    const found = list.find((item) => item.codigo === val);
    return found?.nombre ?? "-";
  };

  return (
    <div className="space-y-6">
      {/* Buscador y botón Agregar Estudiante */}
      <div className="flex items-center justify-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar estudiante..."
          className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleAdd}
          className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded shadow-md"
        >
          + Agregar Estudiante
        </button>
      </div>

      {/* Modal de formulario */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <StudentForm
          defaultData={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      </Modal>

      {/* Tabla de Estudiantes */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-customBluemid/10 text-customBlue uppercase text-left text-xs">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Fecha Nac.</th>
              <th className="px-4 py-3">País</th>
              <th className="px-4 py-3">Profesión</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((s) => (
              <tr key={s.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-2">{s.codigo}</td>
                <td className="px-4 py-2">
                  {s.foto ? (
                    <img
                      src={s.foto}
                      alt={`${s.nombre} ${s.apellido}`}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  )}
                </td>
                <td className="px-4 py-2">{s.nombre} {s.apellido}</td>
                <td className="px-4 py-2">{s.nombreUsuario}</td>
                <td className="px-4 py-2">{s.correo}</td>
                <td className="px-4 py-2">{s.telefono ?? "-"}</td>
                <td className="px-4 py-2">{s.fechaNacimiento ?? "-"}</td>
                <td className="px-4 py-2">{getName(s.pais, countries)}</td>
                <td className="px-4 py-2">{getName(s.profesion, professions)}</td>
                <td className="px-4 py-2">{getName(s.perfil, profiles)}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(s)}
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

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Mostrando{" "}
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredStudentData.length)}{" "}
          de {filteredStudentData.length} estudiantes
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
