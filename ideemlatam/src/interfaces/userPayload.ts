// src/interfaces/userPayload.ts
export interface UserPayload {
    codigo: number;
    nombre: string;
    apellido: string;
    correo: string;
    nombreUsuario: string;
    estado: boolean;                // ← ahora booleano
    pais: number ;
    profesion: number;
    perfil:  number ;
    telefono?: string | null;
    fecha_nacimiento?: string | null;

 
  }
  