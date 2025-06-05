// src/components/teacher/TeacherForm.tsx
"use client";

import { useState } from "react";
import type { TeacherData } from "@/interfaces/teacher";
import { useCountry } from "@/hooks/useCountry";
import { useProfession } from "@/hooks/useProfession";
import { useProfile } from "@/hooks/useProfile";

type Props = {
  defaultData: TeacherData | null;
  onClose: () => void;
  onSave: (data: TeacherData) => void;
};

export default function TeacherForm({ defaultData, onClose, onSave }: Props) {
  const { countries } = useCountry();
  const { professions } = useProfession();
  const { profiles } = useProfile();

  const [form, setForm] = useState<TeacherData>(() => ({
    codigo: defaultData?.codigo ?? 0,
    nombre: defaultData?.nombre ?? "",
    apellido: defaultData?.apellido ?? "",
    correo: defaultData?.correo ?? "",
    nombreUsuario: defaultData?.nombreUsuario ?? "",
    telefono: defaultData?.telefono ?? "",
    foto: defaultData?.foto ?? null,
    fechaNacimiento: defaultData?.fechaNacimiento ?? "",
    pais: defaultData?.pais ?? 0,
    profesion: defaultData?.profesion ?? 0,
    perfil: defaultData?.perfil ?? 0,
    linkedin: defaultData?.linkedin ?? "",
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ["codigo", "pais", "profesion", "perfil"].includes(name)
        ? Number(value)
        : value,
    } as unknown as TeacherData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    await onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Docente" : "Agregar Docente"}
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

        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          placeholder="Correo"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="nombreUsuario"
          value={form.nombreUsuario}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="telefono"
          type="tel"
          value={form.telefono || ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="fechaNacimiento"
          type="date"
          value={form.fechaNacimiento || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

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

        <input
          name="linkedin"
          type="url"
          value={form.linkedin || ""}
          onChange={handleChange}
          placeholder="LinkedIn (URL)"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />
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
          {defaultData ? "Guardar Cambios" : "Crear Docente"}
        </button>
      </div>
    </form>
  );
}
