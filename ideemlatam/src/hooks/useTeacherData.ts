// // src/hooks/TeacherData.ts
// import { useState, useEffect } from "react";
// import type { TeacherData } from "@/interfaces/teacher";
// import {
//   getTeacherData,
//   createTeacherData,
//   updateTeacherData,
// } from "@/api/services/TeacherData";
// import { toast } from "react-hot-toast";

// export function useTeacherData() {
//   const [TeacherDatas, setTeacherDatas] = useState<TeacherData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   // Carga inicial de usuarios
//   const fetchTeacherDatas = async () => {
//     setLoading(true);
//     try {
//       const data = await getTeacherData();
//       setTeacherDatas(data);
      
//     } catch {
//       toast.error("Error cargando Docentes");
//       setError("Error al cargar Docentes");
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   useEffect(() => {
//     fetchTeacherDatas();
//   }, []);

//   // Filtrado dinámico (por nombre o usuario)
//   const filteredTeacherData = TeacherDatas.filter((u) =>
//     u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     u.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Crear Docente
//   const addTeacherData = async (data: TeacherData) => {
//     const id = toast.loading("Creando Docente...");

//     console.log("Creando Docente:", data);
//     try {
//       // Si el back no espera `codigo` al crear, descártalo:
//       const { codigo, ...payload } = data;
//       await createTeacherData(payload);
//       await fetchTeacherDatas();
//       toast.success("Usuario docente", { id });
//     } catch {
//       toast.error("Error al crear docente", { id });
//     }
//   };



//   // Actualizar usuario
//   const editTeacherData = async (data: TeacherData) => {
//     const id = toast.loading("Actualizando usuario...");
//     try {
//       await updateTeacherData(data);
//       await fetchTeacherDatas();
//       toast.success("Docente  actualizado", { id });
//     } catch {
//       toast.error("Error al actualizar docente", { id });
//     }
//   };

//   return {
//     TeacherDatas,
//     loading,
//     error,
//     filteredTeacherData,
//     searchTerm,
//     setSearchTerm,
//     addTeacherData,
//     editTeacherData,
//     refetch: fetchTeacherDatas,
//   };
// }

// src/hooks/useTeacherData.ts
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { TeacherData } from "@/interfaces/teacher";
import {
  getTeacherData,
  createTeacherData,
  updateTeacherData,
} from "@/api/services/TeacherData";

export function useTeacherData() {
  // Renombramos para seguir convención camelCase
  const [teacherDatas, setTeacherDatas] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Carga inicial de usuarios
  const fetchTeacherDatas = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTeacherData();
      // Protección sólida frente a respuestas no-array o null
      setTeacherDatas(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("[useTeacherData] fetch error:", err);
      toast.error("Error cargando Docentes");
      setError("Error al cargar Docentes");
      setTeacherDatas([]);  // aseguramos estado consistente
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherDatas();
  }, []);

  // Filtrado dinámico (por nombre o usuario)
  const filteredTeacherData = teacherDatas.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear Docente
  const addTeacherData = async (data: TeacherData) => {
    const id = toast.loading("Creando Docente...");
    try {
      // Si el back no espera `codigo` al crear, lo descartamos
      const { codigo, ...payload } = data;
      await createTeacherData(payload);
      await fetchTeacherDatas();
      toast.success("Docente creado", { id });
    } catch (err: any) {
      console.error("[useTeacherData] create error:", err);
      toast.error("Error al crear Docente", { id });
    }
  };

  // Actualizar Docente
  const editTeacherData = async (data: TeacherData) => {
    const id = toast.loading("Actualizando Docente...");
    try {
      await updateTeacherData(data);
      await fetchTeacherDatas();
      toast.success("Docente actualizado", { id });
    } catch (err: any) {
      console.error("[useTeacherData] update error:", err);
      toast.error("Error al actualizar Docente", { id });
    }
  };

  return {
    teacherDatas,
    filteredTeacherData,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addTeacherData,
    editTeacherData,
    refetch: fetchTeacherDatas,
  };
}
