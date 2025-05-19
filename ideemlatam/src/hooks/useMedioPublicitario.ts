import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { MedioPublicitario } from "@/interfaces/medioPublicitario";
import {
  getMedio,
  createMedio,
  updateMedio,
} from "@/api/services/medioPublicitario";

export function useMedio() {
  const [medios, setMedios] = useState<MedioPublicitario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");



const fetch = async () => {
    setLoading(true);
    try {
      const data = await getMedio();
      setMedios(Array.isArray(data) ? data : []); // 🔒 Protección sólida
    } catch {
      toast.error("Error cargando áreas");
      setMedios([]); // opcional pero recomendable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredMedios = medios.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMedio = async (data: MedioPublicitario) => {
    const id = toast.loading("Creando Medio Publicitario...");
    try {
      await createMedio(data);
      await fetch();
      toast.success("Medio creada", { id });
    } catch {
      toast.error("Error al crear Medio", { id });
    }
  };

  const editMedio = async (data: MedioPublicitario) => {
    const id = toast.loading("Actualizando Medio...");
    try {
      await updateMedio(data);
      await fetch();
      toast.success("Meido actualizada", { id });
    } catch {
      toast.error("Error al actualizar el Medio", { id });
    }
  };

  return {
    medios,
    filteredMedios,
    loading,
    searchTerm,
    setSearchTerm,
    addMedio,
    editMedio,
  };
}
