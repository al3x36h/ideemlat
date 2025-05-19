import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Study } from "@/interfaces/study";
import {
  getStudy,
  createStudy,
  updateStudy,
} from "@/api/services/study";

export function useStudy() {
  const [studys, setStudy] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");



const fetch = async () => {
    setLoading(true);
    try {
      const data = await getStudy();
      setStudy(Array.isArray(data) ? data : []); // 🔒 Protección sólida
    } catch {
      toast.error("Error cargando Estudios");
      setStudy([]); // opcional pero recomendable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredStudys = studys.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addStudy = async (data: Study) => {
    const id = toast.loading("Creando Estudios...");
    try {
      console.log("Datoooossssss del Estudio",data);
      await createStudy(data);
      
      await fetch();
      toast.success("Estudio creado", { id });
    } catch {
      toast.error("Error al crear Estudio", { id });
    }
  };

  const editStudy = async (data: Study) => {
    const id = toast.loading("Actualizando Studio...");
    try {
      await updateStudy(data);
      await fetch();
      toast.success("Meido actualizada", { id });
    } catch {
      toast.error("Error al actualizar el Estudio", { id });
    }
  };

  return {
    studys,
    filteredStudys,
    loading,
    searchTerm,
    setSearchTerm,
    addStudy,
    editStudy,
  };
}
