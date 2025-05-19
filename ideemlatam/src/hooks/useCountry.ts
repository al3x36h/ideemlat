
import { useState, useEffect } from "react";
import type { Country } from "@/interfaces/userData";
import {
  getCountries,
  createCountry,
  updateCountry,
} from "@/api/services/country";
import { toast } from "react-hot-toast";

export function useCountry() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Carga inicial
  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getCountries();
      setCountries(data);
    } catch {
      toast.error("Error cargando países");
      setError("Error al cargar países");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // Filtrado dinámico
  const filteredCountries = countries.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear país
  const addCountry = async (data: Country) => {
    const id = toast.loading("Creando país...");
    try {
      const { codigo, ...payload } = data; 
      await createCountry(payload);
      await fetch();
      toast.success("País creado", { id });
    } catch {
      toast.error("Error al crear país", { id });
    }
  };



    const editCountry = async (data: Country) => {
      const id = toast.loading("Actualizando profesión...");
      try {
        await updateCountry(data);
        await fetch();
        toast.success("Profesión actualizada", { id });
      } catch {
        toast.error("Error al actualizar profesión", { id });
      }
    };

  return {
    countries,
    loading,
    error,
    filteredCountries,
    searchTerm,
    setSearchTerm,
    addCountry,
    editCountry,
    refetch: fetch,
  };
}
