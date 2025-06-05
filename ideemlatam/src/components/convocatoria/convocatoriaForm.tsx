"use client";

import { useState } from "react";
import type { Convocatoria } from "@/interfaces/convocatoria";

type Props = {
  defaultData: Convocatoria | null;
  onClose: () => void;
  onSave: (data: Convocatoria) => Promise<void> | void;
};

export default function ConvocatoriaForm({ defaultData, onClose, onSave }: Props) {
  const [form, setForm] = useState<Convocatoria>(
    defaultData || {
      nombre: "",
      abreviatura: "",
      fechaInicio: "",
      fechaFin: "",
      activo: false,
      tipo: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "tipo" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    console.log("Form data", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Convocatoria" : "Agregar Convocatoria"}
      </h2>

      <div className="space-y-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border px-3 py-2 rounded-md w-full text-sm"
          required
        />
        <input
          name="abreviatura"
          value={form.abreviatura}
          onChange={handleChange}
          placeholder="Abreviatura"
          className="border px-3 py-2 rounded-md w-full text-sm"
          required
        />
        <input
          type="date"
          name="fechaInicio"
          value={form.fechaInicio}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
          required
        />
        <input
          type="date"
          name="fechaFin"
          value={form.fechaFin}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
          />
          Activo
        </label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value={0}>Curso</option>
          <option value={1}>Posgrado</option>
          <option value={2}>Maestría</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="text-sm px-4 py-2 text-gray-600 hover:underline"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="text-sm px-4 py-2 bg-customBlue hover:bg-customBluemid text-white rounded"
        >
          {defaultData ? "Guardar Cambios" : "Crear Convocatoria"}
        </button>
      </div>
    </form>
  );
}
