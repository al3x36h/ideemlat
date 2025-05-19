
// "use client";

// import { useState } from "react";
// import type { Company } from "@/interfaces/company";
// import CompanyForm from '@/components/company/companyForm';

// type Props = {
//   defaultData: Company | null;
//   onClose: () => void;
//   onSave: (data: Company) => Promise<void> | void;
// };

// export default function AreaForm({ defaultData, onClose, onSave }: Props) {
//   const [form, setForm] = useState<Company>(
//     defaultData || {
//       codigo: 0,
//       nombre: "",
//       abreviatura: "",
//       contacto: "",
//       telefono: 0,
//       correo: "",
//       web: "",
//       activo: true,
//     }
//   );

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox"
//         ? checked
//         : type === "number"
//         ? Number(value)
//         : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(form);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 border rounded-lg shadow space-y-4"
//     >
//       <h2 className="text-xl font-semibold text-customBlue">
//         {defaultData ? "Editar Empresa" : "Agregar Empresa"}
//       </h2>

//       <div className="space-y-4">
//         <input
//           name="nombre"
//           value={form.nombre}
//           onChange={handleChange}
//           placeholder="Nombre"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//           required
//         />

//         <input
//           name="abreviatura"
//           value={form.abreviatura}
//           onChange={handleChange}
//           placeholder="Abreviatura"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         <input
//           name="contacto"
//           value={form.contacto}
//           onChange={handleChange}
//           placeholder="Nombre del contacto"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         <input
//           name="telefono"
//           value={form.telefono || ""}
//           onChange={handleChange}
//           placeholder="Teléfono"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         <input
//           name="correo"
//           type="email"
//           value={form.correo}
//           onChange={handleChange}
//           placeholder="Correo electrónico"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         <input
//           name="web"
//           value={form.web}
//           onChange={handleChange}
//           placeholder="Sitio web"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="activo"
//             checked={form.activo}
//             onChange={handleChange}
//           />
//           Activo
//         </label>
//       </div>

//       <div className="flex justify-end gap-2">
//         <button
//           type="button"
//           onClick={onClose}
//           className="text-sm px-4 py-2 text-gray-600 hover:underline"
//         >
//           Cancelar
//         </button>
//         <button
//           type="submit"
//           className="text-sm px-4 py-2 bg-customBlue hover:bg-customBluemid text-white rounded"
//         >
//           {defaultData ? "Guardar Cambios" : "Crear Empresa"}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import type { Company } from "@/interfaces/company";

type Props = {
  defaultData: Company | null;
  onClose: () => void;
  onSave: (data: Company) => Promise<void> | void;
};


export default function CompanyForm({ defaultData, onClose, onSave }: Props) {
  const [form, setForm] = useState<Company>({
    codigo: 0,
    nombre: "",
    abreviatura: "",
    contacto: "",
    telefono: 0,
    correo: "",
    web: "",
    activo: true,
  });

  

  useEffect(() => {
    if (defaultData) {
      setForm({
        ...defaultData,
        activo: Boolean(defaultData.activo), // Forzar tipo booleano
      });
    }
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "number"
//           ? Number(value)
//           : value,
//     }));
//   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ FORMULARIO ENVIADO:", form); 
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">
        {defaultData ? "Editar Empresa" : "Agregar Empresa"}
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
        />

        <input
          name="contacto"
          value={form.contacto}
          onChange={handleChange}
          placeholder="Nombre del contacto"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="telefono"
          type="number"
          value={form.telefono || ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />

        <input
          name="web"
          value={form.web}
          onChange={handleChange}
          placeholder="Sitio web"
          className="border px-3 py-2 rounded-md w-full text-sm"
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
          {defaultData ? "Guardar Cambios" : "Crear Empresa"}
        </button>
      </div>
    </form>
  );
}
