// // src/hooks/useProfession.ts
// "use client";

// import { useState, useEffect } from "react";
// import type { Profession } from "@/interfaces/profession";
// import {
//   getProfessions,
//   createProfession,
//   updateProfession,
// } from "@/api/services/profesion";
// import toast from "react-hot-toast";

// export function useProfession() {
//   const [professions, setProfessions] = useState<Profession[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetch = async () => {
//     try {
//       setLoading(true);
//       const data = await getProfessions();

//       setProfessions(data);
//     } catch {
//       setError("Error al cargar profesiones");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   const addProfession = async (data: Profession) => {
//     const loadingToast = toast.loading("Creando profesión...");
//     try {
//       const { codigo, ...payload } = data;
//       await createProfession(payload);
//       toast.success("Profesión creada");
//       fetch();
//     } catch {
//       toast.error("Error al crear la profesión");
//     } finally {
//       toast.dismiss(loadingToast);
//     }
//   };

// //   const editProfession = async (data: Profession) => {
// //     const loadingToast = toast.loading("Actualizando profesión...");
// //     try {
// //       const { codigo, ...payload } = data;
// //       await updateProfession(payload);
   
// //       toast.success("Profesión actualizada");
// //       fetch();
// //     } catch {
// //         console.log("✅ Información de Profesion Update", payload);
// //       toast.error("Error al actualizar la profesión");
// //     } finally {
// //       toast.dismiss(loadingToast);
// //     }
// //   };

// const editProfession = async (data: Profession) => {
//     const loadingToast = toast.loading("Actualizando profesión...");
//     try {
//       // enviamos el objeto completo, incluido prof.codigo
//       await updateProfession(data);
//       toast.success("Profesión actualizada");
//       fetch();
//     } catch {
//       toast.error("Error al actualizar la profesión");
//     } finally {
//       toast.dismiss(loadingToast);
//     }
//   };

//   const filteredProfessions = professions.filter((p) =>
//     p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return {
//     professions,
//     filteredProfessions,
//     loading,
//     error,
//     addProfession,
//     editProfession,
//     refetch: fetch,
//     searchTerm,
//     setSearchTerm,
//   };
// }


// src/hooks/useProfession.ts

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Profession } from "@/interfaces/profession";
import {
  getProfessions,
  createProfession,
  updateProfession,
} from "@/api/services/profesion";

export function useProfession() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getProfessions();
      
      setProfessions(data);
    } catch {
      toast.error("Error cargando profesiones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredProfessions = professions.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProfession = async (data: Profession) => {
    const id = toast.loading("Creando profesión...");
    try {
      await createProfession(data);
      await fetch();
      toast.success("Profesión creada", { id });
    } catch {
      toast.error("Error al crear profesión", { id });
    }
  };

  const editProfession = async (data: Profession) => {
    const id = toast.loading("Actualizando profesión...");
    try {
      await updateProfession(data);
      await fetch();
      toast.success("Profesión actualizada", { id });
    } catch {
      toast.error("Error al actualizar profesión", { id });
    }
  };

  return {
    professions,
    filteredProfessions,
    loading,
    searchTerm,
    setSearchTerm,
    addProfession,
    editProfession,
  };
}
