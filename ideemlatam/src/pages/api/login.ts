// src/pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Ignoramos las credenciales; devolvemos datos mock
  res.status(200).json({
    foto: null,
    pais: {
      local: false,
      codigo: 46,
      nombre: "Nicaragua",
      expresion: "^8\\d{7}$",
      codigo_iso: "NI",
      codigo_telefono: "+505",
    },
    codigo: 1,
    correo: "kevinjam91@gmail.com",
    estado: 0,
    nombre: "Kevin Josue",
    perfil: {
      codigo: 1,
      nombre: "Administrador",
      roles: [
        { rol: null, tipo: 0, icono: null, codigo: 1, nombre: "Catalogos", titulo: "Catalogos", comando: null, destino: 3, ubicacion: 0 },
        { rol: null, tipo: 0, icono: null, codigo: 2, nombre: "Academia",  titulo: "Academia",  comando: null, destino: 3, ubicacion: 0 },
        { rol: null, tipo: 0, icono: null, codigo: 3, nombre: "Servicios", titulo: "Servicios", comando: null, destino: 3, ubicacion: 0 },
        { rol: 1,   tipo: 1, icono: null, codigo: 4, nombre: "Pais",      titulo: "Paises",     comando: "/paises",       destino: 3, ubicacion: 0 },
        { rol: 2,   tipo: 1, icono: null, codigo: 5, nombre: "Areas",     titulo: "Areas de Conocimiento", comando: "/areas", destino: 3, ubicacion: 0 },
        { rol: 2,   tipo: 1, icono: null, codigo: 6, nombre: "Convocatorias", titulo: "Convocatorias", comando: "/convos", destino: 3, ubicacion: 0 },
        { rol: 3,   tipo: 1, icono: null, codigo: 7, nombre: "Consultoria",  titulo: "Consultorias", comando: "/consultorias", destino: 3, ubicacion: 0 },
      ],
    },
    sesion: "17f82177-aa85-45d5-82cf-dac61c2845f7",
    apellido: "Aleman Montenegro",
    telefono: null,
    profesion: { codigo: 1, nombre: "Ingeniero de Sistemas" },
    tipo_resultado: 1,
    fecha_nacimiento: null,
  });
}
