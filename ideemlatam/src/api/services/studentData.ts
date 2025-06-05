import { httpClient } from "@/api/httpClient";
import { ENDPOINTS }   from "@/api/endpoints";
import type { StudentData } from "@/interfaces/student";

export const getStudentData = async (): Promise<StudentData[]> => {
  return httpClient<StudentData[]>(ENDPOINTS.STUDENT_DATA());
};

export const createStudentData = async (data: Partial<StudentData>) => {
  return httpClient(ENDPOINTS.USER(), {
    method: "POST",
    body: JSON.stringify(data),
    
 
  });
     
};

export const updateStudentData = async (data: StudentData) => {
  return httpClient(ENDPOINTS.STUDENT_DATA(), {
    method: "PUT",
    body: JSON.stringify(data),
  });
};


