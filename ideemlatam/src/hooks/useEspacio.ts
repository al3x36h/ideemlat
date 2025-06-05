import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Espacio } from "@/interfaces/espacio";

import {
    getEspacio,
    createEspacio,
    updateEspacio,
} from "@/api/services/espacio";

export function useEspacio() {
    const [espacios, setEspacios] = useState<Espacio[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetch = async () => {
        setLoading(true);
        try {
            const data = await getEspacio();
            setEspacios(Array.isArray(data) ? data : []); // 🔒 Protección sólida
        } catch {
            toast.error("Error cargando espacios");
            setEspacios([]); // opcional pero recomendable
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const filteredEspacios = espacios.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addEspacio = async (data: Espacio) => {
        const id = toast.loading("Creando espacio...");
        try {
            await createEspacio(data); 
            await fetch();
            toast.success("Espacio creado", { id });
        } catch {
            toast.error("Error al crear espacio", { id });
        }
    };

    const editEspacio = async (data: Espacio) => {
        const id = toast.loading("Actualizando espacio...");
        try {
            await updateEspacio(data); 
            await fetch();
            toast.success("Espacio actualizado", { id });
        } catch {
            toast.error("Error al actualizar el espacio", { id });
        }
    };

    return {
        espacios,
        filteredEspacios,
        loading,
        searchTerm,
        setSearchTerm,
        addEspacio,
        editEspacio,
    };
}
