// // src/components/teacher/TeacherTable.tsx
// "use client";

// import { useState } from "react";
// import { useTeacherData } from "@/hooks/useTeacherData";
// import { useCountry } from "@/hooks/useCountry";
// import { useProfession } from "@/hooks/useProfession";
// import { useProfile } from "@/hooks/useProfile";
// import TeacherForm from "@/components/teacher/teacherForm";
// import TeacherSkeleton from "@/components/teacher/teacherSkeleton";
// import Modal from "@/components/ui/modal";
// import type { TeacherData } from "@/interfaces/teacher";

// export default function TeacherTable() {
//   const {
//     loading,
//     error,
//     filteredTeacherData,
//     searchTerm,
//     setSearchTerm,
//     addTeacherData,
//     editTeacherData,
//   } = useTeacherData();

//   const { countries } = useCountry();
//   const { professions } = useProfession();
//   const { profiles } = useProfile();

//   const [editing, setEditing] = useState<TeacherData | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [page, setPage] = useState(1);

//   const perPage = 10;
//   const totalPages = Math.ceil(filteredTeacherData.length / perPage);
//   const paginated = filteredTeacherData.slice(
//     (page - 1) * perPage,
//     page * perPage
//   );

//   if (loading) return <TeacherSkeleton />;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   const handleEdit = (t: TeacherData) => {
//     setEditing(t);
//     setShowForm(true);
//   };

//   const handleAdd = () => {
//     setEditing(null);
//     setShowForm(true);
//   };

//   const handleSave = async (data: TeacherData) => {
//     if (editing) await editTeacherData(data);
//     else await addTeacherData(data);
//     setShowForm(false);
//     setPage(1);
//   };

//   const getName = (
//     value: number | { codigo: number; nombre: string },
//     list: { codigo: number; nombre: string }[]
//   ) => {
//     if (typeof value === "object") return value.nombre;
//     const found = list.find((item) => item.codigo === value);
//     return found?.nombre ?? "-";
//   };

//   return (
//     <div className="space-y-6">
//       {/* Buscador y botón Agregar */}
//       <div className="flex items-center justify-center gap-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(1);
//           }}
//           placeholder="Buscar docente..."
//           className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded shadow-md"
//         >
//           + Agregar Docente
//         </button>
//       </div>

//       {/* Modal de formulario */}
//       <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
//         <TeacherForm
//           defaultData={editing}
//           onClose={() => setShowForm(false)}
//           onSave={handleSave}
//         />
//       </Modal>

//       {/* Tabla */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//         <table className="min-w-full text-sm">
//           <thead className="bg-customBluemid/10 text-customBlue uppercase text-left text-xs">
//             <tr>
//               <th className="px-4 py-3">Código</th>
//               <th className="px-4 py-3">Foto</th>
//               <th className="px-4 py-3">Nombre</th>
//               <th className="px-4 py-3">Usuario</th>
//               <th className="px-4 py-3">Correo</th>
//               <th className="px-4 py-3">Teléfono</th>
//               <th className="px-4 py-3">Fecha Nac.</th>
//               <th className="px-4 py-3">País</th>
//               <th className="px-4 py-3">Profesión</th>
//               <th className="px-4 py-3">Perfil</th>
//               <th className="px-4 py-3">LinkedIn</th>
//               <th className="px-4 py-3 text-right">Acción</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {paginated.map((t) => (
//               <tr key={t.codigo} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{t.codigo}</td>
//                 <td className="px-4 py-2">
//                   {t.foto ? (
//                     <img
//                       src={t.foto}
//                       alt={`${t.nombre} ${t.apellido}`}
//                       className="h-8 w-8 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-8 w-8 bg-gray-200 rounded-full" />
//                   )}
//                 </td>
//                 <td className="px-4 py-2">
//                   {t.nombre} {t.apellido}
//                 </td>
//                 <td className="px-4 py-2">{t.nombreUsuario}</td>
//                 <td className="px-4 py-2">{t.correo}</td>
//                 <td className="px-4 py-2">{t.telefono ?? "-"}</td>
//                 <td className="px-4 py-2">{t.fechaNacimiento ?? "-"}</td>
//                 <td className="px-4 py-2">
//                   {getName(t.pais, countries)}
//                 </td>
//                 <td className="px-4 py-2">
//                   {getName(t.profesion, professions)}
//                 </td>
//                 <td className="px-4 py-2">
//                   {getName(t.perfil, profiles)}
//                 </td>
//                 <td className="px-4 py-2">
//                   {t.linkedin ? (
//                     <a
//                       href={t.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="underline"
//                     >
//                       Ver
//                     </a>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   <button
//                     onClick={() => handleEdit(t)}
//                     className="bg-customBlue hover:bg-customBluemid text-white text-xs px-3 py-1 rounded-md shadow-sm"
//                   >
//                     Editar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Paginación */}
//       <div className="flex justify-between items-center mt-4">
//         <span className="text-sm text-gray-600">
//           Mostrando{" "}
//           {(page - 1) * perPage + 1}–
//           {Math.min(page * perPage, filteredTeacherData.length)} de{" "}
//           {filteredTeacherData.length} docentes
//         </span>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             disabled={page === 1}
//             className="px-4 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-40"
//           >
//             ← Anterior
//           </button>
//           <button
//             onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-4 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-40"
//           >
//             Siguiente →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/teacher/TeacherTable.tsx
"use client";

import { useState } from "react";
import { useTeacherData } from "@/hooks/useTeacherData";
import TeacherForm from "@/components/teacher/teacherForm";
import TeacherSkeleton from "@/components/teacher/teacherSkeleton";
import Modal from "@/components/ui/modal";
import type { TeacherData } from "@/interfaces/teacher";
import { useCountry } from "@/hooks/useCountry";
import { useProfession } from "@/hooks/useProfession";
import { useProfile } from "@/hooks/useProfile";

export default function TeacherTable() {
  const {
    loading,
    error,
    filteredTeacherData,
    searchTerm,
    setSearchTerm,
    addTeacherData,
    editTeacherData,
  } = useTeacherData();

  const { countries } = useCountry();
  const { professions } = useProfession();
  const { profiles } = useProfile();

  const [editing, setEditing] = useState<TeacherData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(filteredTeacherData.length / perPage);
  const paginated = filteredTeacherData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) return <TeacherSkeleton />;
  if (error)   return <div className="text-red-500">Error: {error}</div>;

  const handleEdit = (t: TeacherData) => {
    setEditing(t);
    setShowForm(true);
  };
  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };
  const handleSave = async (data: TeacherData) => {
    if (editing) await editTeacherData(data);
    else          await addTeacherData(data);
    setShowForm(false);
    setPage(1);
  };

  // Si el valor viene como objeto o como código, devuelve siempre el nombre
  const getName = (
    val: number | { codigo: number; nombre: string },
    list: { codigo: number; nombre: string }[]
  ) => {
    if (typeof val === "object") return val.nombre;
    const found = list.find((item) => item.codigo === val);
    return found?.nombre ?? "-";
  };

  return (
    <div className="space-y-6">
      {/* Buscador + botón */}
      <div className="flex items-center justify-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          placeholder="Buscar docente..."
          className="pl-3 border p-2 rounded w-2/3 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleAdd}
          className="bg-customBlue hover:bg-customBluemid text-white px-4 py-2 rounded"
        >
          + Agregar Docente
        </button>
      </div>

      {/* Modal con formulario */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <TeacherForm
          defaultData={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      </Modal>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-customBluemid/10 text-customBlue uppercase text-left text-xs">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Fecha Nac.</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">País</th>
              <th className="px-4 py-3">Profesión</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((t) => (
              <tr key={t.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-2">{t.codigo}</td>
                <td className="px-4 py-2">
                  {t.foto
                    ? <img src={t.foto} alt={`${t.nombre} ${t.apellido}`} className="h-8 w-8 rounded-full" />
                    : <div className="h-8 w-8 bg-gray-200 rounded-full" />}
                </td>
                <td className="px-4 py-2">{t.nombre} {t.apellido}</td>
                <td className="px-4 py-2">{t.nombreUsuario}</td>
                <td className="px-4 py-2">{t.correo}</td>
                <td className="px-4 py-2">{t.telefono ?? "-"}</td>
                <td className="px-4 py-2">{t.fechaNacimiento ?? "-"}</td>
                <td className="px-4 py-2">
                  {t.estado === 1 ? "Activo" : "Inactivo"}
                </td>
                <td className="px-4 py-2">{getName(t.pais, countries)}</td>
                <td className="px-4 py-2">{getName(t.profesion, professions)}</td>
                <td className="px-4 py-2">{getName(t.perfil, profiles)}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-customBlue hover:bg-customBluemid text-white text-xs px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Mostrando{" "}
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredTeacherData.length)}{" "}
          de {filteredTeacherData.length} docentes
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 rounded border disabled:opacity-40"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 rounded border disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
