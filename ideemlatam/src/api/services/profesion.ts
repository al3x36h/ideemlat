// src/api/services/user.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { Profession } from "@/interfaces/profession";

export const getProfessions = async (): Promise<Profession[]> => {
  return httpClient<Profession[]>(ENDPOINTS.PROFESION_LIST());
};


export const createProfession = async (data: Partial<Profession>) => {
  return await httpClient(ENDPOINTS.PROFESION_LIST(), {
    method: "POST",
    body: JSON.stringify(data),
  })
}




export const updateProfession = async (data: Profession) => {
  return await httpClient(ENDPOINTS.PROFESION_LIST(), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

