// src/components/user/UserSkeleton.tsx
export default function UserSkeleton() {
  return (
    <div className="bg-white p-6 rounded shadow animate-pulse space-y-4">
      {/* Título */}
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      {/* Filas de tabla */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
      ))}
    </div>
  );
}
