"use client";

export default function espacioSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Cabecera simulada */}
      <div className="h-6 bg-gray-200 rounded w-1/3" />

      {/* Filas simuladas */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
          <div className="h-4 bg-gray-200 rounded w-1/12" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
        </div>
      ))}
    </div>
  );
}
