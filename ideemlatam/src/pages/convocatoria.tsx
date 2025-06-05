
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import ConvocatoriaTable from "@/components/convocatoria/convocatoriaTable";




export default function HorarioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Convocatoria</h1>
     
        <ConvocatoriaTable />
      </div>
    </DashboardLayout>
  )
}