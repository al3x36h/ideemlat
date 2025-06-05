// // src/hooks/useProfile.ts
// import { useState, useEffect } from "react";
// import type { UserProfile } from "@/interfaces/userProfile";
// import { getUserProfile, updateUserProfile } from "@/api/services/userProfile";
// import { toast } from "react-hot-toast";

// export function useUserProfile() {
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   // Carga inicial del perfil
//   const fetchUserProfile = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const data = await getUserProfile();
//       setUserProfile(data);
//     } catch (err: any) {
      
//       toast.error("Error cargando perfil");
//       setError("Error al cargar perfil");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Guardar cambios en el perfil
//   const saveUserProfile = async (updated: UserProfile) => {
//     const toastId = toast.loading("Guardando perfil...");
//     try {
//       const result = await updateUserProfile(updated);
//       setUserProfile(result);
//       toast.success("Perfil actualizado", { id: toastId });
//     } catch (err: any) {
      
//       toast.error("Error al actualizar perfil", { id: toastId });
//     }
//   };

//   useEffect(() => {
//     // No podemos pasar fetchProfile directo a useEffect porque devuelve Promise
//     const load = () => {
//       fetchUserProfile();
//     };
//     load();
//   }, []);

//   return {
//     userProfile,
//     loading,
//     error,
//     fetchUserProfile,
//     saveUserProfile,
//   };
// }


// src/hooks/useProfile.ts

import { useState, useEffect } from "react";
import type { AnyProfile } from "@/interfaces/profileAll";
import { getUserProfile, updateUserProfile } from "@/api/services/userProfile";
import { toast } from "react-hot-toast";

export function useUserProfile() {
  // Perfil completo que vino de la API
  const [originalProfile, setOriginalProfile] = useState<AnyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Carga inicial
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const profile = await getUserProfile();
        setOriginalProfile(profile);
      } catch (err: any) {
        toast.error("Error cargando perfil");
        setError("Error cargando perfil");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Guarda cambios: recibe sólo los campos editados
  const saveUserProfile = async (changes: Partial<AnyProfile>): Promise<AnyProfile | undefined> => {
    if (!originalProfile) return;
    const toastId = toast.loading("Guardando perfil...");
    try {
      const updated = await updateUserProfile(changes, originalProfile);
      setOriginalProfile(updated);
      toast.success("Perfil actualizado", { id: toastId });
      return updated;
    } catch (err: any) {
      toast.error("Error al actualizar perfil", { id: toastId });
      console.error(err);
    }
  };

  return {
    originalProfile,
    loading,
    error,
    saveUserProfile,
  };
}
