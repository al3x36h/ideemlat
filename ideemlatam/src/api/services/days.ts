// src/api/services/days.ts

import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";

export interface Dia {
  codigo: number;
  indice: number;
  nombre: string;
}

export const getDiasDisponibles = async (): Promise<Dia[]> => {
  return httpClient<Dia[]>(ENDPOINTS.DAYS());
};
