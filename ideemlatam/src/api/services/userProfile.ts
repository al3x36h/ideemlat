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
