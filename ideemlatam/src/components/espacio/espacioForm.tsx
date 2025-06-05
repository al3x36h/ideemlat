"use client";

import { useState } from "react";
import type { Espacio } from "@/interfaces/espacio";

type Props = {
  defaultData: Espacio | null;
  onClose: () => void;
  onSave: (data: Espacio) => Promise<void> | void;
};

export default function espacioForm({ defaultData, onClose, onSave }: Props) {
  const [form, setForm] = useState<Espacio>(
    defaultData || {
      nombre: "",
      tipo: 0,
      limite: 0,
      activo: false,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "tipo" || name === "limite"
          ? parseInt(value)
          : value,
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
        {defaultData ? "Editar Espacio" : "Agregar Espacio"}
      </h2>

      <div className="space-y-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del espacio"
          className="border px-3 py-2 rounded-md w-full text-sm"
          required
        />

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value={0}>VIRTUAL</option>
          <option value={1}>AULA</option>
          <option value={2}>LABORATORIO</option>
          <option value={3}>EMPRESA</option>
        </select>

        <input
          name="limite"
          type="number"
          value={form.limite}
          onChange={handleChange}
          placeholder="Límite de personas"
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
          {defaultData ? "Guardar Cambios" : "Crear Espacio"}
        </button>
      </div>
    </form>
  );
}
