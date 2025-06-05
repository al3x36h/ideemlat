// src/api/services/profile.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS }   from "@/api/endpoints";
import type { UserProfile } from "@/interfaces/userProfile";


export const getUserProfile = async (): Promise<UserProfile> => {
  console.log("📡 getUserProfile → GET", ENDPOINTS.USER_PROFILE());
  const userPerfil = await httpClient<UserProfile>(ENDPOINTS.USER_PROFILE());
  console.log("🎯 getUserProfile result", userPerfil);
  return userPerfil;
};

/**
 * PUT /usuario/editar-perfil
 * Actualiza el perfil del usuario autenticado
 */
export const updateUserProfile = async (data: UserProfile): Promise<UserProfile> => {
  console.log("📡 updateProfile → PUT", ENDPOINTS.USER_PROFILE(), data);
  const updated = await httpClient<UserProfile>(ENDPOINTS.USER_PROFILE(), {
    method: "PUT",
    body: JSON.stringify(data),
  });
  console.log("🎯 updateProfile result", updated);
  return updated;
};


// src/api/services/userProfile.ts

// import { httpClient } from "@/api/httpClient";
// import { ENDPOINTS } from "@/api/endpoints";

// // Importa tu unión de perfiles
// import type { AnyProfile } from "@/interfaces/profileAll";

// /**
//  * Obtiene el perfil completo del usuario autenticado.
//  * Devuelve el objeto que viene del endpoint /usuario/editar-perfil.
//  */
// export const getUserProfile = async (): Promise<AnyProfile> => {
//   // Aquí asumimos que USER_PROFILE apunta a /usuario/editar-perfil
//   const profile = await httpClient<AnyProfile>(ENDPOINTS.USER_PROFILE());
//   return profile;
// };

// /**
//  * Actualiza el perfil del usuario autenticado.
//  * - `changes`: solo los campos que cambian (partial de AnyProfile).
//  * - `original`: el objeto completo que vino de getUserProfile().
//  * 
//  * El payload final es la mezcla de original + changes, para conservar
//  * todos los campos (correo, estado, nombreUsuario, linkedin, etc.).
//  * 
//  * El endpoint se elige según original.perfil:
//  *   1 → ESTUDIANTE_EDITAR_PERFIL
//  *   2 → DOCENTE_EDITAR_PERFIL
//  *   otro → USER_PROFILE (genérico)
//  */
// export const updateUserProfile = async (
//   changes: Partial<AnyProfile>,
//   original: AnyProfile
// ): Promise<AnyProfile> => {
//   // 1. Selección de URL según perfil
//   let url = ENDPOINTS.USER_PROFILE();
//   if (original.perfil === 1) {
//     url = ENDPOINTS.STUDENT_DATA();
//   } else if (original.perfil === 2) {
//     url = ENDPOINTS.TEACHER_DATA();
//   }

//   // 2. Construcción del payload completo
//   const payload: AnyProfile = {
//     ...original,
//     ...changes,
//   };


//   // ——— NUEVOS LOGS ———
//   console.group("[DEBUG] updateUserProfile");
//   console.log("📍 URL:", url);
//   console.log("📝 Payload:", payload);
//   console.groupEnd();
//   // ——————————————————

//   // 3. Llamada HTTP
//   const updated = await httpClient<AnyProfile>(url, {
//     method: "PUT",
//     body: JSON.stringify(payload),
//   });

//   return updated;
// };
