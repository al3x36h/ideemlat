// src/api/country.ts
import { httpClient } from "@/api/httpClient"
import { ENDPOINTS } from "@/api/endpoints"
import { Country } from "@/interfaces/userData"

export const getCountries = async (): Promise<Country[]> => {
  return httpClient<Country[]>(ENDPOINTS.COUNTRY_LIST())
}


export const createCountry = async (data: Partial<Country>) => {
  return await httpClient(ENDPOINTS.COUNTRY_LIST(), {
    method: "POST",
    body: JSON.stringify(data),
  })
}


export const updateCountry = async (data: Country) => {
  return await httpClient(ENDPOINTS.COUNTRY_LIST(), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

