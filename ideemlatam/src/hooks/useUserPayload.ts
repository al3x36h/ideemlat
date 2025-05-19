// src/hooks/useUserPayload.ts
import { useState, useEffect } from "react";
import type { UserPayload } from "@/interfaces/userPayload";
import {
  getUsers,
  createUser,
  updateUser,
} from "@/api/services/userPayload";
import { toast } from "react-hot-toast";

export function useUserPayload() {
  const [users, setUsers] = useState<UserPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Carga inicial de usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      
    } catch {
      toast.error("Error cargando usuarios");
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrado dinámico (por nombre o usuario)
  const filteredUsers = users.filter((u) =>
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear usuario
  const addUser = async (data: UserPayload) => {
    const id = toast.loading("Creando usuario...");

    console.log("Creando usuario:", data);
    try {
      // Si el back no espera `codigo` al crear, descártalo:
      const { codigo, ...payload } = data;
      await createUser(payload);
      await fetchUsers();
      toast.success("Usuario creado", { id });
    } catch {
      toast.error("Error al crear usuario", { id });
    }
  };



  // Actualizar usuario
  const editUser = async (data: UserPayload) => {
    const id = toast.loading("Actualizando usuario...");
    try {
      await updateUser(data);
      await fetchUsers();
      toast.success("Usuario actualizado", { id });
    } catch {
      toast.error("Error al actualizar usuario", { id });
    }
  };

  return {
    users,
    loading,
    error,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    addUser,
    editUser,
    refetch: fetchUsers,
  };
}
