"use client";

export default function studySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Cabecera simulada */}
      <div className="h-6 bg-gray-200 rounded w-1/3" />

      {/* Filas simuladas */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded flex-1" /> {/* Nombre */}
          <div className="h-4 bg-gray-200 rounded w-1/6" /> {/* Precio NIO */}
          <div className="h-4 bg-gray-200 rounded w-1/6" /> {/* Precio USD */}
          <div className="h-4 bg-gray-200 rounded w-1/6" /> {/* Estado */}
          <div className="h-4 bg-gray-200 rounded w-1/12" /> {/* Acción */}
        </div>
      ))}
    </div>
  );
}
