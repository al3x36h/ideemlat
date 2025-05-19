// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import Dashboard from "@/components/dashboard/dashboard"
// import type { User } from "@/interfaces/user"

// export default function DashboardPage() {
//   const router = useRouter()
//   const [user, setUser] = useState<User | null>(null)

//   useEffect(() => {
//     const userData = localStorage.getItem("user")
//     if (!userData) {
//       router.push("/")
//       return
//     }
//     setUser(JSON.parse(userData))
//   }, [router])

//   if (!user) return null

//   return <Dashboard user={user} />
// }

// src/pages/dashboard/index.tsx
// "use client";

import Dashboard from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  return <Dashboard />;
}
