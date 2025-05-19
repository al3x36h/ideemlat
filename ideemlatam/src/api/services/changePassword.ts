import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import type { ChangePassword } from "@/interfaces/changePassword";

/**
 * PUT /usuario/cambiarClave
 * Cambia la contraseña del usuario autenticado
 */
export const changePassword = async (data: ChangePassword): Promise<void> => {
  

  await httpClient<void>(ENDPOINTS.CHANGE_PASSWORD(), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  
};
