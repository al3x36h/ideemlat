// src/api/endpoints.ts
const BASE_URL = "http://192.168.64.169/ideem/api/v1/";

export const ENDPOINTS = {
    LOGIN: () => `${BASE_URL}usuario/login`, // Nuevo endpoint
    COUNTRY_LIST: () => `${BASE_URL}pais`,
    PROFESION_LIST: () => `${BASE_URL}profesion`,
    USER:  () => `${BASE_URL}usuario`,
    USER_PROFILE: () => `${BASE_URL}usuario/editar-perfil`,
    PROFILE: () => `${BASE_URL}perfil?activo=true`,
    CHANGE_PASSWORD: () => `${BASE_URL}usuario/cambiar-clave`,
    KOWNLEDGE_AREAS: () => `${BASE_URL}area-conocimiento`,
    COMPANY: () => `${BASE_URL}empresa`,
    MEDIO_PUBLICITARIO: () => `${BASE_URL}medio-publicitario`,
    STUDY: () => `${BASE_URL}estudio`,
    SCHEDULE: () => `${BASE_URL}horario`,
    DAYS: () => `${BASE_URL}dia`,
    CONVOCATORIA: () => `${BASE_URL}convocatoria`,
    ESPACIO: () => `${BASE_URL}espacio`,
    TEACHER_DATA: () => `${BASE_URL}docente/`,
    STUDENT_DATA: () => `${BASE_URL}estudiante/`,
    STUDENT_DATA_EDIT: () => `${BASE_URL}estudiante/editar-perfil`,
    TEACHER_DATA_EDIT: () => `${BASE_URL}docente/editar-perfil`,
    // PROFESION_LIST: () => `${BASE_URL}profesion?activo=true`,
    
    

  // KNOWLEDGE_AREAS: `${BASE_URL}/knowledge-areas/`,
//   KNOWLEDGE_AREAS: (categoryId: number) => `${BASE_URL}/knowledge-areas/?category=${categoryId}`, // Nuevo endpoint
//   COURSES: (knowledgeAreaId: number) => `${BASE_URL}/courses/?knowledge_area=${knowledgeAreaId}`,
//   COURSE_DETAIL: (courseId: number) => `${BASE_URL}/course-detail/${courseId}/`,
//   SLIDER: () =>  `${BASE_URL}/slider/`,
//   FEATURED: () =>  `${BASE_URL}/featured/`,
//   EVENTS: () =>  `${BASE_URL}/event/`,
//   BLOG: () =>  `${BASE_URL}/blog/`,
//   CATEGORY: () =>  `${BASE_URL}/category/`,
            


};
