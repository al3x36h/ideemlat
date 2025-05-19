
import { ENDPOINTS } from "@/api/endpoints"
import { httpClient } from "@/api/httpClient"



export interface Country {
    local: boolean;
    codigo: number;
    nombre: string;
    expresion: string;
    codigoIso: string;
    codigoTelefono: string;
  }
  export interface Role {
    rol: number | null;
    tipo: 0 | 1;
    icono: string | null;
    codigo: number;
    nombre: string;
    titulo: string;
    comando: string | null;
    destino: number;
    ubicacion: number;
  }
  export interface Profile {
    codigo: number;
    nombre: string;
    roles: Role[];
  }
  export interface Profession {
    codigo: number;
    nombre: string;
  }
  export interface User {
    foto: string | null;
    pais: Country;
    codigo: number;
    correo: string;
    estado: number;
    nombre: string;
    perfil: Profile;
    sesion: string;
    apellido: string;
    telefono: string | null;
    profesion: Profession;
    tipo_resultado: number;
    fecha_nacimiento: string | null;
  }
  
// src/interfaces/user.ts (actualizado)


// export const login = async (
//   email: string,
//   password: string
// ): Promise<User> => {


//   const hashedPassword = await hashSHA256(password);
//   console.log("🔒 Password hasheada:", hashedPassword);

//   const response = await httpClient<User>(ENDPOINTS.LOGIN(), { // Ejecutamos la función
//     method: "POST",
//     body: JSON.stringify({ 
//       usuario: email,  // ¡Verifica si el backend espera "email" o "correo"!
//       clave: hashedPassword 
//     }),
//   });


//   // Guardar el token en localStorage o sessionStorage
//   if (response.sesion) {
//     localStorage.setItem('authToken', response.sesion);
//     localStorage.setItem('userData', JSON.stringify(response));
//   }

//   return response;
// };