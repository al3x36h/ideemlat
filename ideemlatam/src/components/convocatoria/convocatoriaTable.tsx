"use client";

import { useState, useEffect } from "react";
import { useConvocatoria } from "@/hooks/useConvocatoria";
import ConvocatoriaForm from "@/components/convocatoria/convocatoriaForm";
import ConvocatoriaSkeleton from "@/components/convocatoria/convocatoriaSkeleton";
import Modal from "@/components/ui/modal";
import type { Convocatoria } from "@/interfaces/convocatoria";

const tiposTexto: Record<number, string> = {
  0: "Curso",
  1: "Posgrado",
  2: "Maestría",
};

export default function ConvocatoriaTable() {
  const {
    filteredConvocatorias,
    loading,
    addConvocatoria,
    editConvocatoria,
    searchTerm,
    setSearchTerm,
  } = useConvocatoria();

  const [editing, setEditing] = useState<Convocatoria | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredConvocatorias.length / perPage);
  const paginated = filteredConvocatorias.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (searchTerm && filteredConvocatorias.length === 0) {
      // toast.error("No se encontraron convocatorias.");
    }
  }, [searchTerm, filteredConvocatorias.length]);

  if (loading) return <ConvocatoriaSkeleton />;

  const handleEdit = (item: Convocatoria) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: Convocatoria) => {
    if (editing) await editConvocatoria(data);
    else await addConvocatoria(data);

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
          placeholder="Buscar convocatoria..."
          className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ConvocatoriaForm
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
              <th className="px-4 py-3">Abreviatura</th>
              <th className="px-4 py-3">Inicio</th>
              <th className="px-4 py-3">Fin</th>
              <th className="px-4 py-3">Activo</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((c) => (
              <tr key={c.nombre} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{c.abreviatura}</td>
                <td className="px-4 py-2">{c.fechaInicio}</td>
                <td className="px-4 py-2">{c.fechaFin}</td>
                <td className="px-4 py-2">{c.activo ? "Sí" : "No"}</td>
                <td className="px-4 py-2">{tiposTexto[c.tipo] || "Desconocido"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(c)}
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

      {/* Botón agregar */}
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
          Mostrando {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredConvocatorias.length)} de {filteredConvocatorias.length}
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
