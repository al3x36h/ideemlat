"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { changePassword } from "@/api/services/changePassword";
import { hashSHA256 } from "@/util/hash";
import { toast } from "react-hot-toast";

export default function ChangePasswordForm() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.codigo) {
      toast.error("Usuario no autenticado.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas nuevas no coinciden.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Cambiando contraseña...");

    try {
      const hashedOld = await hashSHA256(currentPassword);
      const hashedNew = await hashSHA256(newPassword);
      const clave = Buffer.from(hashedOld, "hex").toString("base64");
      const claveNueva = Buffer.from(hashedNew, "hex").toString("base64");

      await changePassword({
        codigo: user.codigo,
        clave,
        claveNueva,
      });

      toast.success("Contraseña actualizada con éxito.", { id: toastId });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error("Contraseña actual incorrecta o error del servidor.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-customBlue">Cambiar Contraseña</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña actual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Ingresa tu contraseña actual"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Ingresa tu nueva contraseña"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu nueva contraseña"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-customBlue hover:bg-customBluemid text-white rounded text-sm disabled:opacity-50"
        >
          {loading ? "Actualizando..." : "Guardar Contraseña"}
        </button>
      </div>
    </form>
  );
}
