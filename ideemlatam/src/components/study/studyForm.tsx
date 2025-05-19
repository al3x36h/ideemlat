"use client";

import { useState } from "react";
import type { Study } from "@/interfaces/study";
import { useArea } from "@/hooks/useAreaConocimiento";

type Props = {
  defaultData: Study | null;
  onClose: () => void;
  onSave: (data: Study) => Promise<void> | void;
};

export default function StudyForm({ defaultData, onClose, onSave }: Props) {
  const [form, setForm] = useState<Study>(
    defaultData || {
      codigo: 0,
      nombre: "",
      enlaceContenido: "",
      enlaceNio: "",
      enlaceDolar: "",
      tipo: 1,
      estado: true,
      orden: 0,
      precioNio: 0,
      precioDolar: 0,
      areaConocimiento: 0,
    }
  );

  const { areas } = useArea();

  // ✅ CORREGIDO: Convertir areaConocimiento (y otros) a número
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : ["precioNio", "precioDolar", "orden", "tipo", "areaConocimiento"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      estado: form.estado ? 1 : 0,
      tipo: Number(form.tipo),
    };

    console.log("Payload", payload);
    onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Estudio" : "Agregar Estudio"}
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
          name="enlaceContenido"
          value={form.enlaceContenido}
          onChange={handleChange}
          placeholder="Enlace al contenido"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="enlaceNio"
          value={form.enlaceNio}
          onChange={handleChange}
          placeholder="Enlace Pago NIO"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="enlaceDolar"
          value={form.enlaceDolar}
          onChange={handleChange}
          placeholder="Enlace Pago USD"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        {/* Precio NIO con botones rápidos */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Precio en córdobas
          </label>
          <div className="flex items-center gap-2">
            <input
              name="precioNio"
              type="number"
              value={form.precioNio}
              onChange={handleChange}
              min={0}
              step={1}
              className="border px-3 py-2 rounded-md w-full text-sm"
            />
            {[10, 25, 50].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, precioNio: val }))
                }
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
              >
                C${val}
              </button>
            ))}
          </div>
        </div>

        {/* Precio USD con botones rápidos */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Precio en dólares
          </label>
          <div className="flex items-center gap-2">
            <input
              name="precioDolar"
              type="number"
              value={form.precioDolar}
              onChange={handleChange}
              min={0}
              step={1}
              className="border px-3 py-2 rounded-md w-full text-sm"
            />
            {[5, 10, 20].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, precioDolar: val }))
                }
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
              >
                U${val}
              </button>
            ))}
          </div>
        </div>

        <input
          name="orden"
          type="number"
          value={form.orden}
          onChange={handleChange}
          placeholder="Orden de visualización"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value={0}>Curso Especializado</option>
          {/* <option value={1}>Especialización</option> */}
        </select>

        <select
          name="areaConocimiento"
          value={form.areaConocimiento}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value={0}>Seleccione un área de conocimiento</option>
          {areas.map((area) => (
            <option key={area.codigo} value={area.codigo}>
              {area.nombre ?? `Área ${area.codigo}`}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="estado"
            checked={form.estado}
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
          {defaultData ? "Guardar Cambios" : "Crear Estudio"}
        </button>
      </div>
    </form>
  );
}
