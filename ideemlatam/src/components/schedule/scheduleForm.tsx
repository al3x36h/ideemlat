"use client";

import { useState, useEffect } from "react";
import type { Schedule, Dia } from "@/interfaces/schedule";
import { useDias } from "@/hooks/useDay";

type Props = {
  defaultData: Schedule | null;
  onClose: () => void;
  onSave: (data: Schedule) => Promise<void> | void;
};

export default function ScheduleForm({
  defaultData,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Schedule>(
    defaultData || {
      codigo: 0,
      nombre: "",
      abreviatura: "",
      orden: 0,
      activo: false,
      horaInicio: "00:00:00",
      horaFin: "00:00:00",
      dias: [],
    }
  );

  const { dias } = useDias();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
  };

  const toggleDia = (dia: Dia) => {
    setForm((prev) => {
      const exists = prev.dias.find((d) => d.codigo === dia.codigo);
      return {
        ...prev,
        dias: exists
          ? prev.dias.filter((d) => d.codigo !== dia.codigo)
          : [...prev.dias, dia],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transformedDias = form.dias.map((d) => ({
      dia: d.codigo,
      tipo: 0,
    }));

    const dataToSend = {
      ...form,
      dias: transformedDias,
    };

    onSave(dataToSend as Schedule);
    console.log("Form data", dataToSend);
    console.log("Enviando a editar:", dataToSend);

  };




  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Horario" : "Crear Horario"}
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
          type="number"
          name="orden"
          value={form.orden}
          onChange={handleChange}
          placeholder="Orden"
          className="border px-3 py-2 rounded-md w-full text-sm"
          required
        />

        <div className="flex gap-4">
          <label className="flex flex-col text-sm flex-1">
            Hora de Inicio
            <input
              type="time"
              name="horaInicio"
              value={form.horaInicio}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
              required
            />
          </label>
          <label className="flex flex-col text-sm flex-1">
            Hora de Fin
            <input
              type="time"
              name="horaFin"
              value={form.horaFin}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
              required
            />
          </label>
        </div>

        <div className="space-y-2">
          <span className="block text-sm font-medium">Días</span>
          <div className="flex flex-wrap gap-2">
            {dias.map((d) => (
              <label key={d.codigo} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.dias.some((dia) => dia.codigo === d.codigo)}
                  onChange={() => toggleDia(d)}
                />
                {d.nombre}
              </label>
            ))}
          </div>
        </div>

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
          {defaultData ? "Guardar Cambios" : "Crear Horario"}
        </button>
      </div>
    </form>
  );
}
