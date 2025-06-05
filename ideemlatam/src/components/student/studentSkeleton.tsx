// src/components/student/StudentSkeleton.tsx
export default function StudentSkeleton() {
    return (
      <div className="bg-white p-6 rounded shadow animate-pulse space-y-4">
        {/* Título */}
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        {/* Filas de tabla simuladas */}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }
  