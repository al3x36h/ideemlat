// src/pages/paises.tsx




"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import CountryTable from "@/components/country/CountryTable"

export default function PaisesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Países</h1>
     
        <CountryTable />
      </div>
    </DashboardLayout>
  )
}





// "use client"

// import CountryList from "@/components/country/CountryList";

// export default function PaisesPage() {
//   return (
//     <main className="p-8">
//       <CountryList />
//     </main>
//   )
// }

