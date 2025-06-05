
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import EspacioTable from "@/components/espacio/espacioTable";




export default function HorarioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Espacios</h1>
     
        <EspacioTable />
      </div>
    </DashboardLayout>
  )
}