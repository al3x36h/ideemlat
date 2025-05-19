
import { useState, useEffect } from "react";
import type { Profile } from "@/interfaces/profile";
import { toast } from "react-hot-toast";
import { getProfile } from '../api/services/profile';


export function useProfile() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  // Carga inicial
  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfiles(data);
    } catch {
      toast.error("Error cargando perfiles");
      setError("Error al cargar perfiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);







  return {
    profiles,
    loading,
    error,
    refetch: fetch,
  };
}
