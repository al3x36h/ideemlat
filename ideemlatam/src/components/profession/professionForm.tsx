// src/components/profession/professionForm.tsx
"use client";

import { useState } from "react";
import type { Profession } from "@/interfaces/profession";

type Props = {
  defaultData: Profession | null;
  onClose: () => void;
  onSave: (data: Profession) => Promise<void> | void;
};

export default function ProfessionForm({
  defaultData,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Profession>(
    defaultData || { codigo: 0, nombre: "", abreviatura: "", activo: false }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Profesión" : "Agregar Profesión"}
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
          {defaultData ? "Guardar Cambios" : "Crear Profesión"}
        </button>
      </div>
    </form>
  );
}
