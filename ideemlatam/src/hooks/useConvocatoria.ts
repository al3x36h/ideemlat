import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Convocatoria } from "@/interfaces/convocatoria";

import {
    getConvocatoria,
    createConvocatoria,
    updateConvocatoria,
} from "@/api/services/convocatoria";

export function useConvocatoria() {
    const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetch = async () => {
        setLoading(true);
        try {
            const data = await getConvocatoria();
            setConvocatorias(Array.isArray(data) ? data : []); // 🔒 Protección sólida
        } catch {
            toast.error("Error cargando convocatorias");
            setConvocatorias([]); // opcional pero recomendable
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const filteredConvocatorias = convocatorias.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addConvocatoria = async (data: Convocatoria) => {
        const id = toast.loading("Creando convocatoria...");
        try {
            await createConvocatoria(data); 
            await fetch();
            toast.success("Convocatoria creada", { id });
        } catch {
            toast.error("Error al crear convocatoria", { id });
        }
    };

    const editConvocatoria = async (data: Convocatoria) => {
        const id = toast.loading("Actualizando convocatoria...");
        try {
            await updateConvocatoria(data); 
            await fetch();
            toast.success("Convocatoria actualizada", { id });
        } catch {
            toast.error("Error al actualizar la convocatoria", { id });
        }
    };

    return {
        convocatorias,
        filteredConvocatorias,
        loading,
        searchTerm,
        setSearchTerm,
        addConvocatoria,
        editConvocatoria,
    };
}
