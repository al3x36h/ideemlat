export default function CountrySkeleton() {
    return (
      <div className="bg-white p-6 rounded shadow animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
        ))}
      </div>
    )
  }
  