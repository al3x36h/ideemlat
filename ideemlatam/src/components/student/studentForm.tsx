// src/components/student/StudentForm.tsx
"use client";

import { useState } from "react";
import type { StudentData } from "@/interfaces/student";
import { useCountry } from "@/hooks/useCountry";
import { useProfession } from "@/hooks/useProfession";
import { useProfile } from "@/hooks/useProfile";

type Props = {
  defaultData: StudentData | null;
  onClose: () => void;
  onSave: (data: StudentData) => void;
};

export default function StudentForm({ defaultData, onClose, onSave }: Props) {
  const { countries } = useCountry();
  const { professions } = useProfession();
  const { profiles } = useProfile();

  const [form, setForm] = useState<StudentData>(() => ({
    codigo: defaultData?.codigo ?? 0,
    nombre: defaultData?.nombre ?? "",
    apellido: defaultData?.apellido ?? "",
    correo: defaultData?.correo ?? "",
    nombreUsuario: defaultData?.nombreUsuario ?? "",
    telefono: defaultData?.telefono ?? null,
    foto: defaultData?.foto ?? null,
    fechaNacimiento: defaultData?.fechaNacimiento ?? null,
    pais: defaultData?.pais ?? 0,
    profesion: defaultData?.profesion ?? 0,
    perfil: defaultData?.perfil ?? 0,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: 
        name === "pais" ||
        name === "profesion" ||
        name === "perfil" ||
        name === "codigo"
          ? Number(value)
          : value === "" && (name === "telefono" || name === "fechaNacimiento" || name === "foto")
            ? null
            : value,
    } as unknown as StudentData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Estudiante" : "Agregar Estudiante"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Código (readonly) */}
        {/* <div>
          <label className="block text-xs font-medium text-gray-700">Código</label>
          <input
            name="codigo"
            type="number"
            value={form.codigo}
            readOnly
            className="border px-3 py-2 rounded-md w-full text-sm bg-gray-100 cursor-not-allowed"
          />
        </div> */}

        {/* Nombre */}
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* Apellido */}
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* Correo */}
        <input
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          placeholder="Correo"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* Nombre de usuario */}
        <input
          name="nombreUsuario"
          value={form.nombreUsuario}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* Teléfono */}
        <input
          name="telefono"
          type="tel"
          value={form.telefono ?? ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* Fecha de nacimiento */}
        <input
          name="fechaNacimiento"
          type="date"
          value={form.fechaNacimiento ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* País */}
        <select
          name="pais"
          value={form.pais || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value="">Seleccione país</option>
          {countries.map(c => (
            <option key={c.codigo} value={c.codigo}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Profesión */}
        <select
          name="profesion"
          value={form.profesion || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value="">Seleccione profesión</option>
          {professions.map(p => (
            <option key={p.codigo} value={p.codigo}>
              {p.nombre}
            </option>
          ))}
        </select>

        {/* Perfil */}
        <select
          name="perfil"
          value={form.perfil || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value="">Seleccione perfil</option>
          {profiles.map(p => (
            <option key={p.codigo} value={p.codigo}>
              {p.nombre}
            </option>
          ))}
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
          {defaultData ? "Guardar Cambios" : "Crear Estudiante"}
        </button>
      </div>
    </form>
  );
}
