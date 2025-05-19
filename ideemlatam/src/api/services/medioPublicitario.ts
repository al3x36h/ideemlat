// src/api/services/user.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { MedioPublicitario } from "@/interfaces/medioPublicitario";

export const getMedio = async (): Promise<MedioPublicitario[]> => {
  return httpClient<MedioPublicitario[]>(ENDPOINTS.MEDIO_PUBLICITARIO());
};


export const createMedio = async (data: Partial<MedioPublicitario>) => {
  return await httpClient(ENDPOINTS.MEDIO_PUBLICITARIO(), {
    method: "POST",
    body: JSON.stringify(data),
  })
}


export const updateMedio = async (data: MedioPublicitario) => {
  return await httpClient(ENDPOINTS.MEDIO_PUBLICITARIO(), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

