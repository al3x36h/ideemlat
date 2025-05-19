
"use client";

import { useState, useEffect } from "react";
import {useCompany} from "@/hooks/useCompany";
import CompanyForm from "@/components/company/companyForm";
import CompanySkeleton from "@/components/company/companySkeleton";
import Modal from "@/components/ui/modal";
import type { Company } from "@/interfaces/company";

export default function CompanyTable() {
  const {
    filteredCompany,
    loading,
    addCompany,
    editcompany,
    searchTerm,
    setSearchTerm,
  } = useCompany();

  const [editing, setEditing] = useState<Company | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredCompany.length / perPage);
  const paginated = filteredCompany.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    // Solo para mostrar “No se encontraron profesiones.” cuando no hay resultados
    // (Opcional: podrías mover este toast dentro del hook si prefieres)
    if (searchTerm && filteredCompany.length === 0) {
      // toast.error("No se encontraron profesiones.");
    }
  }, [searchTerm, filteredCompany.length]);

  if (loading) return <CompanySkeleton />;

  const handleEdit = (p: Company) => {
    setEditing(p);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: Company) => {
    // Ya no manejas toasts aquí
    if (editing) await editcompany(data);
    else await addCompany(data);

    setShowForm(false);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Buscador y botón de agregar */}
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar area..."
          className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:ring focus:ring-blue-200"
        />
    
      </div>

      {/* Modal del formulario */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <CompanyForm
          defaultData={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      </Modal>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-customBluemid/10 text-customBlue uppercase text-left  text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Abreviatura</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Web</th>
             <th className="px-4 py-3">Activo</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((p) => (
              <tr key={p.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">{p.abreviatura}</td>
                <td className="px-4 py-2">{p.contacto}</td>
                <td className="px-4 py-2">{p.telefono}</td>
                <td className="px-4 py-2">{p.correo}</td>
                <td className="px-4 py-2">{p.web}</td>
                <td className="px-4 py-2">{p.activo ? "Sí" : "No"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(p)}
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

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Mostrando{" "}
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredCompany.length)}{" "}
          de {filteredCompany.length}
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
