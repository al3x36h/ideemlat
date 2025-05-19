// src/api/services/user.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { AreaConocimiento } from "@/interfaces/areaConocimiento";

export const getArea = async (): Promise<AreaConocimiento[]> => {
  return httpClient<AreaConocimiento[]>(ENDPOINTS.KOWNLEDGE_AREAS());
};


export const createArea = async (data: Partial<AreaConocimiento>) => {
  return await httpClient(ENDPOINTS.KOWNLEDGE_AREAS(), {
    method: "POST",
    body: JSON.stringify(data),
  })
}


export const updateArea = async (data: AreaConocimiento) => {
  return await httpClient(ENDPOINTS.KOWNLEDGE_AREAS(), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

