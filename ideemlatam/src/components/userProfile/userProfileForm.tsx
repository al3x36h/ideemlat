

"use client";

import { useState, useEffect } from "react";
import type { UserProfile } from "@/interfaces/userProfile";
import { useAuth } from "@/context/AuthContext";
import { updateUserProfile } from "@/api/services/userProfile";
import { useCountry } from "@/hooks/useCountry";
import { useProfession } from "@/hooks/useProfession";
import { toast } from "react-hot-toast";

export default function UserProfileForm() {
  const { user, isLoaded, setUser } = useAuth(); // ⬅️ incluye setUser
  const { countries } = useCountry();
  const { professions } = useProfession();

  const [form, setForm] = useState<UserProfile | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos del usuario al montar
  useEffect(() => {
    if (isLoaded && user) {
      setForm({
        codigo: user.codigo,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        foto: user.foto,
        fechaNacimiento: user.fechaNacimiento,
        pais: typeof user.pais === "object" ? user.pais.codigo : user.pais,
        profesion:
          typeof user.profesion === "object"
            ? user.profesion.codigo
            : user.profesion,
      });
      setPreview(typeof user.foto === "string" ? user.foto : null);
    }
  }, [isLoaded, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (["pais", "profesion"].includes(name)) {
      setForm((prev) =>
        prev ? { ...prev, [name]: value === "" ? null : Number(value) } : prev
      );
    } else {
      setForm((prev) =>
        prev ? { ...prev, [name]: value } : prev
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString() || null;
      setPreview(base64String);
      setForm((prev) =>
        prev ? { ...prev, foto: base64String } : prev
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const body: UserProfile = {
      ...form,
      telefono: form.telefono || null,
      fechaNacimiento: form.fechaNacimiento || null,
      pais: Number(form.pais),
      profesion: Number(form.profesion),
      foto: form.foto || null,
    };

    console.log("📤 Enviando datos al backend:", body);

    setLoading(true);
    const toastId = toast.loading("Guardando perfil...");
    try {
      await updateUserProfile(body);
      // ✅ Actualiza el contexto y localStorage
      const updatedUser = { ...user, ...body };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      toast.success("Perfil actualizado", { id: toastId });
    } catch (err: any) {
      toast.error("Error al actualizar", { id: toastId });
      console.error("🔥 Error al guardar perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  if (
    !isLoaded ||
    !form ||
    countries.length === 0 ||
    professions.length === 0
  ) {
    return <p className="text-sm text-gray-500">Cargando perfil...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">Editar Perfil</h2>

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
          name="telefono"
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

        {/* Chooser de imagen */}
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">Foto de perfil</label>
          {preview && (
            <img
              src={preview}
              alt="Previsualización"
              className="mb-2 w-24 h-24 object-cover rounded-full border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block text-sm text-gray-700"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-customBlue hover:bg-customBluemid text-white rounded text-sm disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}


// // src/components/UserProfileForm.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useUserProfile } from "@/hooks/useUserProfile";
// import { useCountry } from "@/hooks/useCountry";
// import { useProfession } from "@/hooks/useProfession";
// import { toast } from "react-hot-toast";
// import type { AnyProfile } from "@/interfaces/profileAll";

// export default function UserProfileForm() {
//   const { user: authUser, setUser } = useAuth();
//   const { originalProfile, loading: loadingProfile, error } = useUserProfile();
//   const { countries } = useCountry();
//   const { professions } = useProfession();

//   // Estado local de cambios y preview de imagen
//   const [changes, setChanges] = useState<Partial<AnyProfile>>({});
//   const [preview, setPreview] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);

//   // Inicializar `changes` y `preview` cuando llegue el profile
//   useEffect(() => {
//     if (!originalProfile) return;

//     setChanges({
//       nombre: originalProfile.nombre,
//       apellido: originalProfile.apellido,
//       telefono: originalProfile.telefono,
//       foto: originalProfile.foto,
//       fechaNacimiento: originalProfile.fechaNacimiento,
//       pais: originalProfile.pais,
//       profesion: originalProfile.profesion,
//       // campos extra según perfil
//       ...(originalProfile.perfil === 1 && {
//         correo: originalProfile.correo,
//         nombreUsuario: originalProfile.nombreUsuario,
//       }),
//       ...(originalProfile.perfil === 0 && {
//         correo: originalProfile.correo,
//         nombreUsuario: originalProfile.nombreUsuario,
//         linkedin: originalProfile.linkedin,
//       }),
//     });
//     setPreview(originalProfile.foto);
    
//   }, [originalProfile]);

    
//   // Manejador genérico para inputs, selects y file
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, files } = e.target as any;
//     setChanges((prev) => {
//       const next = { ...prev };
//       if (name === "foto" && files?.[0]) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const b64 = reader.result as string;
//           setPreview(b64);
//           setChanges((p) => ({ ...p, foto: b64 }));
//         };
//         reader.readAsDataURL(files[0]);
//       } else if (["pais", "profesion"].includes(name)) {
//         next[name] = value === "" ? null : Number(value);
//       } else {
//         next[name] = value;
//       }
//       return next;
//     });
//   };

//   // Enviar cambios
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!originalProfile) return;

//     setSaving(true);
//     // saveUserProfile proviene de useUserProfile
//     const { saveUserProfile } = useUserProfile();
//     try {
//       const updated = await saveUserProfile(changes);
//       if (updated) {
//         // actualizar contexto y localStorage
//         setUser(updated);
//         localStorage.setItem("userData", JSON.stringify(updated));
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Mientras carga el perfil o no hay data
//   if (loadingProfile || !originalProfile) {
//     return <p className="text-sm text-gray-500">Cargando perfil…</p>;
//   }
//   if (error) {
//     return <p className="text-sm text-red-500">Error al cargar perfil.</p>;
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4"
//     >
//       <h2 className="text-xl font-semibold text-customBlue">Editar Perfil</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Nombre */}
//         <input
//           name="nombre"
//           value={changes.nombre ?? ""}
//           onChange={handleChange}
//           placeholder="Nombre"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         {/* Apellido */}
//         <input
//           name="apellido"
//           value={changes.apellido ?? ""}
//           onChange={handleChange}
//           placeholder="Apellido"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         {/* Teléfono */}
//         <input
//           name="telefono"
//           value={changes.telefono ?? ""}
//           onChange={handleChange}
//           placeholder="Teléfono"
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         {/* Fecha de nacimiento */}
//         <input
//           name="fechaNacimiento"
//           type="date"
//           value={changes.fechaNacimiento ?? ""}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded-md w-full text-sm"
//         />

//         {/* País */}
//         <select
//           name="pais"
//           value={changes.pais ?? ""}
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

//         {/* Profesión */}
//         <select
//           name="profesion"
//           value={changes.profesion ?? ""}
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

//         {/* Estudiante: correo y usuario */}
//         {originalProfile.perfil === 1 && (
//           <>
//             <input
//               name="correo"
//               type="email"
//               value={changes.correo ?? ""}
//               onChange={handleChange}
//               placeholder="Correo"
//               className="border px-3 py-2 rounded-md w-full text-sm"
//             />
//             <input
//               name="nombreUsuario"
//               value={changes.nombreUsuario ?? ""}
//               onChange={handleChange}
//               placeholder="Nombre de Usuario"
//               className="border px-3 py-2 rounded-md w-full text-sm"
//             />
//           </>
//         )}

//         {/* Docente: LinkedIn */}
//         {originalProfile.perfil === 2 && (
//           <input
//             name="linkedin"
//             type="url"
//             value={changes.linkedin ?? ""}
//             onChange={handleChange}
//             placeholder="URL de LinkedIn"
//             className="border px-3 py-2 rounded-md w-full text-sm col-span-2"
//           />
//         )}

//         {/* Foto */}
//         <div className="col-span-2">
//           <label className="block mb-1 text-sm font-medium">Foto de perfil</label>
//           {preview && (
//             <img
//               src={preview}
//               alt="Previsualización"
//               className="mb-2 w-24 h-24 object-cover rounded-full border"
//             />
//           )}
//           <input
//             type="file"
//             name="foto"
//             accept="image/*"
//             onChange={handleChange}
//             className="block text-sm text-gray-700"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={saving}
//           className="px-4 py-2 bg-customBlue hover:bg-customBluemid text-white rounded text-sm disabled:opacity-50"
//         >
//           {saving ? "Guardando…" : "Guardar Cambios"}
//         </button>
//       </div>
//     </form>
//   );
// }
