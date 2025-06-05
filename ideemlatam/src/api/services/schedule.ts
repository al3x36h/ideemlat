// src/api/services/schedule.ts

import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import { Schedule } from "@/interfaces/schedule";

export const getSchedules = async (): Promise<Schedule[]> => {
  return httpClient<Schedule[]>(ENDPOINTS.SCHEDULE());
};

export const createSchedule = async (data: Partial<Schedule>) => {
  return await httpClient(ENDPOINTS.SCHEDULE(), {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateSchedule = async (data: Schedule) => {
  return await httpClient(ENDPOINTS.SCHEDULE(), {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
