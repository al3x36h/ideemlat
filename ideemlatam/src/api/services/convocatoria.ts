// src/api/services/convocatoria.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { Convocatoria } from "@/interfaces/convocatoria";

export const getConvocatoria = async (): Promise<Convocatoria[]> => {
    return httpClient<Convocatoria[]>(ENDPOINTS.CONVOCATORIA());
};

export const createConvocatoria = async (data: Partial<Convocatoria>) => {
    return await httpClient(ENDPOINTS.CONVOCATORIA(), {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateConvocatoria = async (data: Convocatoria) => {
    return await httpClient(ENDPOINTS.CONVOCATORIA(), {
        method: "PUT",
        body: JSON.stringify(data),
    });
};
