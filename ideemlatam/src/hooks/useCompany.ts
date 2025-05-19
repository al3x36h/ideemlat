import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Company } from "@/interfaces/company";
import {
  getCompany,
  createCompany,
  updateCompany,
} from "@/api/services/company";

export function useCompany() {
  const [companys, setCompanys] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


const fetch = async () => {
    setLoading(true);
    try {
      const data = await getCompany();
      setCompanys(Array.isArray(data) ? data : []); // 🔒 Protección sólida
    } catch {
      toast.error("Error cargando empresas");
      setCompanys([]); // opcional pero recomendable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredCompany = companys.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCompany = async (data: Company) => {
    const id = toast.loading("Creando area...");
    try {
      await createCompany(data);
      await fetch();
      toast.success("Empresa creada", { id });
    } catch {
      toast.error("Error al crear empresa", { id });
    }
  };

  const editcompany = async (data: Company) => {
    const id = toast.loading("Actualizando area...");
    try {
      await updateCompany(data);
      await fetch();
      toast.success("Empresa actualizada", { id });
    } catch {
      toast.error("Error al actualizar la empresa", { id });
    }
  };

  return {
    companys,
    filteredCompany,
    loading,
    searchTerm,
    setSearchTerm,
    addCompany,
    editcompany,
  };
}
