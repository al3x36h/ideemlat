// src/api/services/user.ts
import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { Company } from "@/interfaces/company";

export const getCompany = async (): Promise<Company[]> => {
  return httpClient<Company[]>(ENDPOINTS.COMPANY());
};


export const createCompany = async (data: Partial<Company>) => {
  return await httpClient(ENDPOINTS.COMPANY(), {
    method: "POST",
    body: JSON.stringify(data),
  })
}


export const updateCompany = async (data: Company) => {
  return await httpClient(ENDPOINTS.COMPANY(), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

