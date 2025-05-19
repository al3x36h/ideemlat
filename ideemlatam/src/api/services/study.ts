import { httpClient } from "@/api/httpClient";
import { ENDPOINTS } from "@/api/endpoints";
import type { Study } from "@/interfaces/study";

// ✅ GET - Obtener estudios
export const getStudy = async (): Promise<Study[]> => {
  try {
    const res = await httpClient<Study[]>(ENDPOINTS.STUDY());
    console.log("✅ [getStudy] Estudios recibidos:", res);
    return res;
  } catch (error) {
    console.error("❌ [getStudy] Error al obtener estudios:");
    console.error(error);
    throw error;
  }
};

// ✅ POST - Crear nuevo estudio
export const createStudy = async (data: Partial<Study>) => {
  console.log("📤 [createStudy] Enviando datos:");
  console.table(data);

  try {
    const res = await httpClient(ENDPOINTS.STUDY(), {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log("✅ [createStudy] Respuesta del backend:");
    console.log(res);
    return res;
  } catch (error: any) {
    console.error("❌ [createStudy] Error al crear estudio:");
    console.error("Mensaje:", error.message);

    // Si tu httpClient lanza texto plano
    if (error instanceof Response) {
      const text = await error.text();
      console.error("🧨 Respuesta cruda:", text);
    }

    throw error;
  }
};

// ✅ PUT - Actualizar estudio
export const updateStudy = async (data: Study) => {
  console.log("📤 [updateStudy] Enviando datos:");
  console.table(data);

  try {
    const res = await httpClient(ENDPOINTS.STUDY(), {
      method: "PUT",
      body: JSON.stringify(data),
    });

    console.log("✅ [updateStudy] Respuesta del backend:");
    console.log(res);
    return res;
  } catch (error: any) {
    console.error("❌ [updateStudy] Error al actualizar estudio:");
    console.error("Mensaje:", error.message);

    if (error instanceof Response) {
      const text = await error.text();
      console.error("🧨 Respuesta cruda:", text);
    }

    throw error;
  }
};
