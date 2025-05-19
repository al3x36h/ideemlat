
"use client";

import { useState } from "react";
import { useCountry } from "@/hooks/useCountry";
import CountryForm from "@/components/country/countryForm";
import CountrySkeleton from "@/components/country/countrySkeleton";
import Modal from "@/components/ui/modal";
import type { Country } from "@/interfaces/userData";

export default function CountryTable() {
  const {
    filteredCountries,
    loading,
    addCountry,
    editCountry,
    searchTerm,
    setSearchTerm,
  } = useCountry();

  const [editing, setEditing] = useState<Country | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredCountries.length / perPage);
  const paginated = filteredCountries.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) return <CountrySkeleton />;

  const handleEdit = (country: Country) => {
    setEditing(country);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (data: Country) => {
    if (editing) {
      await editCountry(data);
    } else {
      await addCountry(data);
    }
    setShowForm(false);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Buscador y botón de agregar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar país..."
            className="pl-10 border p-2 rounded w-2/3 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
    
      </div>

      {/* Modal del formulario */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <CountryForm
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
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">ISO</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((c) => (
              <tr key={c.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{c.codigo}</td>
                <td className="px-4 py-2">{c.codigoIso}</td>
                <td className="px-4 py-2">{c.codigoTelefono}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(c)}
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

      <div  className="flex justify-end items-end mt-2">

      <button
          onClick={handleAdd}
          className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded shadow-md"
        >
          + Agregar País
        </button>

      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Mostrando{" "}
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredCountries.length)}{" "}
          de {filteredCountries.length} países
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
