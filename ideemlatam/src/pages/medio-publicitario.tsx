
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import MediosTable from "@/components/mediosPublicitario/mediosTable";



export default function AreaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Medios Publicitarios</h1>
     
        <MediosTable />
      </div>
    </DashboardLayout>
  )
}