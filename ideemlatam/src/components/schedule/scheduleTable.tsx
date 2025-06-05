"use client";

import { useState, useEffect } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import ScheduleForm from "@/components/schedule/scheduleForm";
import ScheduleSkeleton from "@/components/schedule/scheduleSkeleton";
import Modal from "@/components/ui/modal";
import type { Schedule } from "@/interfaces/schedule";

export default function ScheduleTable() {
  const {
    filteredSchedules,
    loading,
    addSchedule,
    editSchedule,
    searchTerm,
    setSearchTerm,
  } = useSchedule();

  const [editing, setEditing] = useState<Schedule | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const perPage = 10;
  const totalPages = Math.ceil(filteredSchedules.length / perPage);
  const paginated = filteredSchedules.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    if (searchTerm && filteredSchedules.length === 0) {
      // toast.error("No schedules found.");
    }
  }, [searchTerm, filteredSchedules.length]);

  if (!isClient || loading) return <ScheduleSkeleton />;

  const handleEdit = (s: Schedule) => {
    setEditing(s);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: Schedule) => {
    if (editing) await editSchedule(data);
    else await addSchedule(data);

    setShowForm(false);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar horario..."
          className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ScheduleForm
          defaultData={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      </Modal>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-customBluemid/10 text-customBlue uppercase text-left text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Inicio</th>
              <th className="px-4 py-3">Fin</th>
              <th className="px-4 py-3">Activo</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((s) => (
              <tr key={s.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-2">{s.nombre}</td>
                <td className="px-4 py-2">{s.horaInicio}</td>
                <td className="px-4 py-2">{s.horaFin}</td>
                <td className="px-4 py-2">{s.activo ? "Sí" : "No"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(s)}
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

      <div className="flex justify-end items-end mt-2">
        <button
          onClick={handleAdd}
          className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded"
        >
          + Agregar
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Mostrando {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredSchedules.length)} de {filteredSchedules.length}
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
