export interface Convocatoria {
    nombre: string;
    abreviatura: string;
    fechaInicio: string; // ISO date string
    fechaFin: string;    // ISO date string
    activo: boolean;
    tipo: number;
}