// src/hooks/useDias.ts

import { useEffect, useState } from "react";
import { getDiasDisponibles } from "@/api/services/days";
import type { Dia } from "@/api/services/days";
import { toast } from "react-hot-toast";

export function useDias() {
  const [dias, setDias] = useState<Dia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getDiasDisponibles();
      setDias(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Error cargando días disponibles");
      setDias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { dias, loading };
}
