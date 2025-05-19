"use client"

import { useState } from "react"
import type { Country } from "@/interfaces/userData"

type Props = {
  defaultData: Country | null
  onClose: () => void
  onSave: (data: Country) => void
}

export default function CountryForm({ defaultData, onClose, onSave }: Props) {
  const [form, setForm] = useState<Country>(defaultData || {
    local: false,
    codigo: 0,
    nombre: "",
    expresion: "",
    codigoIso: "",
    codigoTelefono: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar País" : "Agregar País"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />
        {/* <input
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          placeholder="Código"
          className="border px-3 py-2 rounded-md w-full text-sm"
          type="number"
          isvisible ={false}
        /> */}
        <input
          name="codigoIso"
          value={form.codigoIso}
          onChange={handleChange}
          placeholder="Código ISO"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />
        <input
          name="codigoTelefono"
          value={form.codigoTelefono}
          onChange={handleChange}
          placeholder="Prefijo Teléfono"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />
        <input
          name="expresion"
          value={form.expresion}
          onChange={handleChange}
          placeholder="Expresión RegEx"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />
        {/* <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            name="local"
            checked={form.local}
            onChange={handleChange}
          />
          ¿Es local?
        </label> */}
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
          {defaultData ? "Guardar Cambios" : "Crear País"}
        </button>
      </div>
    </form>
  )
}
