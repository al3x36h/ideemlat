
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import AreaTable from "@/components/areaConocimiento/areaTable";



export default function AreaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Areas de Conocimiento</h1>
     
        <AreaTable />
      </div>
    </DashboardLayout>
  )
}