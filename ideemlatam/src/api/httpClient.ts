

// src/api/httpClient.ts
export const httpClient = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem("authToken");

  const headers = new Headers({
    "Content-Type": "application/json",
    ...options.headers,
  });
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 🐛 DEBUG: petición saliente
  console.log("➡️ HTTP Request:", {
    url,
    method: options.method ?? "GET",
    headers: Object.fromEntries(headers.entries()),
    body: options.body,
  });

  try {
    console.log("🧪 Token desde localStorage:", localStorage.getItem("authToken"));

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 🐛 DEBUG: status de la respuesta
    console.log("⬅️ HTTP Response:", {
      url,
      status: response.status,
      statusText: response.statusText,
    });

    if (response.status === 401) {
      localStorage.removeItem("authToken");
      throw new Error("Sesión expirada, por favor inicia sesión nuevamente");
    }

    // Intentamos parsear JSON; si no es JSON, leemos texto
    const contentType = response.headers.get("content-type") || "";
    let payload: any;
    if (contentType.includes("application/json")) {
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }
    } else {
      const text = await response.text();
      payload = { message: text };
    }

    // Manejo de errores más robusto
    if (!response.ok) {
      console.error("❌ HTTP Error payload:", payload);

      const errorMessage =
        typeof payload?.message === "string"
          ? payload.message
          : typeof payload?.error === "string"
          ? payload.error
          : response.statusText || "Error en la solicitud";

      throw new Error(errorMessage);
    }

    // 🐛 DEBUG: respuesta exitosa
    console.log("✅ HTTP Success payload:", payload);
    return payload as T;
  } catch (error) {
    console.error("🔥 HTTP Client Exception:", error);
    throw error;
  }
};
