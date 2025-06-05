
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


// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { profileConfig, Role } from "@/config/profileConfig";
// import { httpClient } from "@/api/httpClient";
// import type { AnyProfile } from "@/interfaces/profileAll";
// import { toast } from "react-hot-toast";

// export function useProfile() {
//   const { user, isLoaded, setUser } = useAuth();
//   const tipo = user?.tipo as Role;
//   const config = profileConfig[tipo] ?? profileConfig[Role.USUARIO];

//   const [profile, setProfile] = useState<AnyProfile | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   // Carga inicial del perfil
//   useEffect(() => {
//     if (!isLoaded || !user) return;

//     (async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await httpClient<AnyProfile>(config.endpoint());
//         // Aseguramos que el objeto tenga código y perfil
//         setProfile({ ...data, codigo: data.codigo, perfil: tipo } as AnyProfile);
//       } catch (e: any) {
//         setError("Error cargando perfil");
//         toast.error("Error cargando perfil");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [isLoaded, user, tipo, config]);

//   // Guarda cambios en el perfil
//   const save = async (updated: AnyProfile) => {
//     setLoading(true);
//     try {
//       const result = await httpClient<AnyProfile>(config.endpoint(), {
//         method: "PUT",
//         body: JSON.stringify(updated),
//       });
//       setProfile(result);
//       setUser(result as any);
//       localStorage.setItem("userData", JSON.stringify(result));
//       toast.success("Perfil actualizado");
//     } catch (e: any) {
//       setError("Error al actualizar perfil");
//       toast.error("Error al actualizar perfil");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { profile, loading, error, save };
// }
