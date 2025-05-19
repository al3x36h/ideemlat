import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { AreaConocimiento } from "@/interfaces/areaConocimiento";
import {
  getArea,
  createArea,
  updateArea,
} from "@/api/services/areaConocimiento";

export function useArea() {
  const [areas, setAareas] = useState<AreaConocimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");



const fetch = async () => {
    setLoading(true);
    try {
      const data = await getArea();
      setAareas(Array.isArray(data) ? data : []); // 🔒 Protección sólida
    } catch {
      toast.error("Error cargando áreas");
      setAareas([]); // opcional pero recomendable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredAreas = areas.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addAreas = async (data: AreaConocimiento) => {
    const id = toast.loading("Creando area...");
    try {
      await createArea(data);
      await fetch();
      toast.success("Area creada", { id });
    } catch {
      toast.error("Error al crear area", { id });
    }
  };

  const editAarea = async (data: AreaConocimiento) => {
    const id = toast.loading("Actualizando area...");
    try {
      await updateArea(data);
      await fetch();
      toast.success("Area actualizada", { id });
    } catch {
      toast.error("Error al actualizar el area", { id });
    }
  };

  return {
    areas,
    filteredAreas,
    loading,
    searchTerm,
    setSearchTerm,
    addAreas,
    editAarea,
  };
}
