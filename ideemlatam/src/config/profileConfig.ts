// // src/config/profileConfig.ts
// import { ENDPOINTS } from "@/api/endpoints";

// export enum Role {
//   DOCENTE   = 0,
//   ESTUDIANTE = 1,
//   USUARIO    = 4,
// }

// interface ProfileConfig {
//   /** Función que retorna la URL donde actualizar este tipo de perfil */
//   endpoint: () => string;
//   /** Nombres de campos extra que sólo aplica a este perfil */
//   extraFields: string[];
// }

// export const profileConfig: Record<Role, ProfileConfig> = {
//   [Role.USUARIO]: {
//     endpoint: ENDPOINTS.USER_PROFILE,
//     extraFields: []
//   },
//   [Role.ESTUDIANTE]: {
//     endpoint: ENDPOINTS.ESTUDIANTE_EDITAR_PERFIL,
//     extraFields: ["correo", "nombreUsuario"]
//   },
//   [Role.DOCENTE]: {
//     endpoint: ENDPOINTS.DOCENTE_EDITAR_PERFIL,
//     extraFields: ["correo", "nombreUsuario", "linkedin"]
//   }
// };
