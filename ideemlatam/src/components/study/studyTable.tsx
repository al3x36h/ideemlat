"use client";

import { useState, useEffect } from "react";
import { useStudy } from "@/hooks/useStudy";
import Modal from "@/components/ui/modal";
import StudyForm from "@/components/study/studyForm";
import StudySkeleton from "@/components/study/studySkeleton";
import type { Study } from "@/interfaces/study";

export default function StudysTable() {
  const {
    filteredStudys,
    loading,
    addStudy,
    editStudy,
    searchTerm,
    setSearchTerm,
  } = useStudy();

  const [editing, setEditing] = useState<Study | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredStudys.length / perPage);
  const paginated = filteredStudys.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    if (searchTerm && filteredStudys.length === 0) {
      // toast.error("No se encontraron estudios.");
    }
  }, [searchTerm, filteredStudys.length]);

  if (loading) return <StudySkeleton />;

  const handleEdit = (study: Study) => {
    setEditing(study);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: Study) => {
    if (editing) await editStudy(data);
    else await addStudy(data);
    setShowForm(false);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar Estudios..."
          className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Modal con Formulario */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <StudyForm
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
              <th className="px-4 py-3">Precio NIO</th>
              <th className="px-4 py-3">Precio USD</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((study) => (
              <tr key={study.nombre} className="hover:bg-gray-50">
                <td className="px-4 py-2">{study.nombre}</td>
                <td className="px-4 py-2">C${study.precioNio}</td>
                <td className="px-4 py-2">${study.precioDolar}</td>
                <td className="px-4 py-2">{study.estado ? "Activo" : "Inactivo"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(study)}
                    className="bg-customBlue hover:bg-customBluemid text-white text-xs px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón Agregar */}
      <div className="flex justify-end items-end mt-2">
        <button
          onClick={handleAdd}
          className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded"
        >
          + Agregar
        </button>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Mostrando{" "}
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredStudys.length)}{" "}
          de {filteredStudys.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 border rounded disabled:opacity-40"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 border rounded disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
