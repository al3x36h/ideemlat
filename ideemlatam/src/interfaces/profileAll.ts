// // src/interfaces/profile.ts

// /** Campos comunes a todos los perfiles */
// export interface BaseProfile {
//     codigo: number;
//     nombre: string;
//     apellido: string;
//     telefono: string | null;
//     foto: string | null;
//     fechaNacimiento: string | null;
//     pais: number;
//     profesion: number;
//     /** Código de perfil según tu API (0,1,4) */
//     perfil: number;
//   }
  
//   /** Perfil de estudiante (incluye correo y nombre de usuario) */
//   export interface StudentProfile extends BaseProfile {
//     correo: string;
//     nombreUsuario: string;
//   }
  
//   /** Perfil de docente (todo lo de estudiante + LinkedIn) */
//   export interface TeacherProfile extends StudentProfile {
//     linkedin: string | null;
//   }
  
//   /** Unión de todos los perfiles posibles */
//   export type AnyProfile = BaseProfile | StudentProfile | TeacherProfile;
  

// src/interfaces/profileAll.ts

/** Campos comunes a todos los perfiles */
export interface BaseProfile {
    codigo: number;
    nombre: string;
    apellido: string;
    telefono: string | null;
    foto: string | null;
    fechaNacimiento: string | null;
    pais: number;
    profesion: number;
    perfil: number;  // todos lo tienen
    estado: number;  // todos lo tienen
  }
  
  /** Perfil de estudiante (perfil = 1): añade correo y nombreUsuario */
  export interface StudentProfile extends BaseProfile {
    correo: string;
    nombreUsuario: string;
  }
  
  /** Perfil de docente (perfil = 2): añade linkedin */
  export interface TeacherProfile extends StudentProfile {
    linkedin: string | null;
  }
  
  /** Cualquier payload posible de “editar-perfil” */
  export type AnyProfile = BaseProfile | StudentProfile | TeacherProfile;
  