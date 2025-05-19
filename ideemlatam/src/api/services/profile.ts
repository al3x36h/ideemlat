// src/api/country.ts
import { httpClient } from "@/api/httpClient"
import { ENDPOINTS } from "@/api/endpoints"
import { Profile } from "@/interfaces/profile"


export const getProfile = async (): Promise<Profile[]> => {
  return httpClient<Profile[]>(ENDPOINTS.PROFILE())
}

