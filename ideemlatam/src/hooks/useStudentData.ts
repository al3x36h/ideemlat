
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { StudentData } from "@/interfaces/student";
import {
  getStudentData,
  createStudentData,
  updateStudentData,
} from "@/api/services/studentData";


export function useStudentData() {
  // Renombramos para seguir convención camelCase
  const [studentDatas, setStudentData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Carga inicial de usuarios
  const fetchStudentData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStudentData();
      // Protección sólida frente a respuestas no-array o null
      setStudentData(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("[useStudentData] fetch error:", err);
      toast.error("Error cargando Estudiantes");
      setError("Error al cargar Estudiantes");
      setStudentData([]);  // aseguramos estado consistente
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Filtrado dinámico (por nombre o usuario)
  const filteredStudentData = studentDatas.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear Docente
  const addStudentData = async (data: StudentData) => {
    const id = toast.loading("Creando Docente...");
    try {
      // Si el back no espera `codigo` al crear, lo descartamos
      const { codigo, ...payload } = data;
      await createStudentData(payload);
      await fetchStudentData();
      toast.success("Estudiante creado", { id });
    } catch (err: any) {
      console.error("[useStudentData] create error:", err);
      toast.error("Error al crear Estudiante", { id });
    }
  };

  // Actualizar Docente
  const editStudentData = async (data: StudentData) => {
    const id = toast.loading("Actualizando Docente...");
    try {
      await updateStudentData(data);
      await fetchStudentData();
      toast.success("Estudian actualizado", { id });
    } catch (err: any) {
      console.error("[useStudentData] update error:", err);
      toast.error("Error al actualizar Estudiante", { id });
    }
  };

  return {
    studentDatas,
    filteredStudentData,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addStudentData,
    editStudentData,
    refetch: fetchStudentData,
  };
}
