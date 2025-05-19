
// "use client";

// import { useState } from "react";
// import type { UserPayload } from "@/interfaces/userPayload";
// import { useCountry } from "@/hooks/useCountry";
// import { useProfession } from "@/hooks/useProfession";
// import { useProfile } from "@/hooks/useProfile";

// type Props = {
//   defaultData: UserPayload | null;
//   onClose: () => void;
//   onSave: (data: UserPayload) => void;
// };

// export default function UserForm({ defaultData, onClose, onSave }: Props) {
//   const { countries } = useCountry();
//   const { professions } = useProfession();
//   const { profiles } = useProfile();

//   const [form, setForm] = useState<UserPayload>(
//     defaultData ?? {
//       nombre: "",
//       apellido: "",
//       correo: "",
//       nombreUsuario: "",
//       estado: false,
//       pais: null,
//       profesion: null,
//       perfil: null,
//       telefono: "",
//       fecha_nacimiento: "",
//     }
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "estado") {
//       setForm((prev) => ({ ...prev, estado: checked }));
//     } else if (["pais", "profesion", "perfil"].includes(name)) {
//       setForm((prev) => ({
//         ...prev,
//         [name]: value === "" ? null : Number(value),
//       }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSave(form);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 border rounded-lg shadow space-y-4"
//     >
//       <h2 className="text-xl font-semibold text-customBlue">
//         {defaultData ? "Editar Usuario" : "Agregar Usuario"}
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="nombre"
//           value={form.nombre}
//           onChange={handleChange}
//           placeholder="Nombre"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />
//         <input
//           name="apellido"
//           value={form.apellido}
//           onChange={handleChange}
//           placeholder="Apellido"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />
//         <input
//           name="correo"
//           type="email"
//           value={form.correo}
//           onChange={handleChange}
//           placeholder="Correo"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />
//         <input
//           name="nombreUsuario"
//           value={form.nombreUsuario}
//           onChange={handleChange}
//           placeholder="Nombre de usuario"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="estado"
//             checked={form.estado}
//             onChange={handleChange}
//           />
//           Activo
//         </label>

//         <select
//           name="pais"
//           value={form.pais ?? ""}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         >
//           <option value="">Seleccione país</option>
//           {countries.map((c) => (
//             <option key={c.codigo} value={c.codigo}>
//               {c.nombre}
//             </option>
//           ))}
//         </select>

//         <select
//           name="profesion"
//           value={form.profesion ?? ""}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         >
//           <option value="">Seleccione profesión</option>
//           {professions.map((p) => (
//             <option key={p.codigo} value={p.codigo}>
//               {p.nombre}
//             </option>
//           ))}
//         </select>

//         <select
//           name="perfil"
//           value={form.perfil ?? ""}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         >
//           <option value="">Seleccione perfil</option>
//           {profiles.map((p) => (
//             <option key={p.codigo} value={p.codigo}>
//               {p.nombre}
//             </option>
//           ))}
//         </select>

//         <input
//           name="telefono"
//           value={form.telefono || ""}
//           onChange={handleChange}
//           placeholder="Teléfono"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />
//         <input
//           name="fecha_nacimiento"
//           type="date"
//           value={form.fecha_nacimiento || ""}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />
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
//           {defaultData ? "Guardar Cambios" : "Crear Usuario"}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import type { UserPayload } from "@/interfaces/userPayload";
import { useCountry } from "@/hooks/useCountry";
import { useProfession } from "@/hooks/useProfession";
import { useProfile } from "@/hooks/useProfile";

type Props = {
  defaultData: UserPayload | null;
  onClose: () => void;
  onSave: (data: UserPayload) => void;
};

export default function UserForm({ defaultData, onClose, onSave }: Props) {
  const { countries } = useCountry();
  const { professions } = useProfession();
  const { profiles } = useProfile();

  // ✅ Corrige el estado inicial con normalización inline
  const [form, setForm] = useState<UserPayload>(() => {
    if (!defaultData) {
      return {
        nombre: "",
        apellido: "",
        correo: "",
        nombreUsuario: "",
        estado: false,
        pais: null,
        profesion: null,
        perfil: null,
        telefono: "",
        fecha_nacimiento: "",
      };
    }

    return {
      ...defaultData,
      pais:
        typeof defaultData.pais === "object"
          ? defaultData.pais.codigo
          : defaultData.pais,
      profesion:
        typeof defaultData.profesion === "object"
          ? defaultData.profesion.codigo
          : defaultData.profesion,
      perfil:
        typeof defaultData.perfil === "object"
          ? defaultData.perfil.codigo
          : defaultData.perfil,
    };
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (name === "estado") {
      setForm((prev) => ({ ...prev, estado: checked }));
    } else if (["pais", "profesion", "perfil"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? null : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
        {defaultData ? "Editar Usuario" : "Agregar Usuario"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="estado"
            checked={form.estado}
            onChange={handleChange}
          />
          Activo
        </label>

        <select
          name="pais"
          value={form.pais ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value="">Seleccione país</option>
          {countries.map((c) => (
            <option key={c.codigo} value={c.codigo}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          name="profesion"
          value={form.profesion ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value="">Seleccione profesión</option>
          {professions.map((p) => (
            <option key={p.codigo} value={p.codigo}>
              {p.nombre}
            </option>
          ))}
        </select>

        <select
          name="perfil"
          value={form.perfil ?? ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full text-sm"
        >
          <option value="">Seleccione perfil</option>
          {profiles.map((p) => (
            <option key={p.codigo} value={p.codigo}>
              {p.nombre}
            </option>
          ))}
        </select>

        <input
          name="telefono"
          value={form.telefono || ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border px-3 py-2 rounded-md w-full text-sm"
        />
        <input
          name="fecha_nacimiento"
          type="date"
          value={form.fecha_nacimiento || ""}
          onChange={handleChange}
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
          {defaultData ? "Guardar Cambios" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
}
