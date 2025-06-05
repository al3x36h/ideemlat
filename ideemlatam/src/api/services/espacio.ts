// src/api/services/espacio.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { Espacio } from "@/interfaces/espacio";

export const getEspacio = async (): Promise<Espacio[]> => {
    return httpClient<Espacio[]>(ENDPOINTS.ESPACIO());
};

export const createEspacio = async (data: Partial<Espacio>) => {
    return await httpClient(ENDPOINTS.ESPACIO(), {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateEspacio = async (data: Espacio) => {
    return await httpClient(ENDPOINTS.ESPACIO(), {
        method: "PUT",
        body: JSON.stringify(data),
    });
};
