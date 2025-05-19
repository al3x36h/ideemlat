import { httpClient } from "@/api/httpClient";
import { ENDPOINTS }   from "@/api/endpoints";
import type { UserPayload }  from "@/interfaces/userPayload";

export const getUsers = async (): Promise<UserPayload[]> => {
  return httpClient<UserPayload[]>(ENDPOINTS.USER());
};

export const createUser = async (data: Partial<UserPayload>) => {
  return httpClient(ENDPOINTS.USER(), {
    method: "POST",
    body: JSON.stringify(data),
    
 
  });
     
};

export const updateUser = async (data: UserPayload) => {
  return httpClient(ENDPOINTS.USER(), {
    method: "PUT",
    body: JSON.stringify(data),
  });
};


