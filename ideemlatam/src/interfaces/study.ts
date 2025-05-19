export interface Study {
    codigo: number;
    nombre: string;
    enlaceContenido: string;
    enlaceNio: string; // Representa el valor de la moneda en Nio
    enlaceDolar: string; // Representa el valor de la moneda en USD
    tipo: number;
    estado: boolean; 
    orden: number;
    precioNio: number;
    precioDolar: number;
    areaConocimiento: number;
}