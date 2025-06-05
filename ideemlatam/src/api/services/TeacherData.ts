import { httpClient } from "@/api/httpClient";
import { ENDPOINTS }   from "@/api/endpoints";
import type { TeacherData }  from "@/interfaces/teacher";

export const getTeacherData = async (): Promise<TeacherData[]> => {
  return httpClient<TeacherData[]>(ENDPOINTS.TEACHER_DATA());
};

export const createTeacherData = async (data: Partial<TeacherData>) => {
    console.log("[createTeacherData] POST payload:", data);
  return httpClient(ENDPOINTS.TEACHER_DATA(), {
    method: "POST",
    body: JSON.stringify(data),
    
 
  });
     
};

export const updateTeacherData = async (data: TeacherData) => {

    console.log("[updateTeacherData] PUT payload:", data);
  return httpClient(ENDPOINTS.TEACHER_DATA(), {
    method: "PUT",
    body: JSON.stringify(data),
    
  });

};
