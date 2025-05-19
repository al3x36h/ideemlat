// src/hooks/useProfile.ts
import { useState, useEffect } from "react";
import type { UserProfile } from "@/interfaces/userProfile";
import { getUserProfile, updateUserProfile } from "@/api/services/userProfile";
import { toast } from "react-hot-toast";

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Carga inicial del perfil
  const fetchUserProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUserProfile();
      setUserProfile(data);
    } catch (err: any) {
      
      toast.error("Error cargando perfil");
      setError("Error al cargar perfil");
    } finally {
      setLoading(false);
    }
  };

  // Guardar cambios en el perfil
  const saveUserProfile = async (updated: UserProfile) => {
    const toastId = toast.loading("Guardando perfil...");
    try {
      const result = await updateUserProfile(updated);
      setUserProfile(result);
      toast.success("Perfil actualizado", { id: toastId });
    } catch (err: any) {
      
      toast.error("Error al actualizar perfil", { id: toastId });
    }
  };

  useEffect(() => {
    // No podemos pasar fetchProfile directo a useEffect porque devuelve Promise
    const load = () => {
      fetchUserProfile();
    };
    load();
  }, []);

  return {
    userProfile,
    loading,
    error,
    fetchUserProfile,
    saveUserProfile,
  };
}
