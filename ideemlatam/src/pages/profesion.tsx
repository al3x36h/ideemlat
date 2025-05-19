
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import ProfesionTable from "@/components/profession/professionTable"


export default function ProfessionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Profesión</h1>
     
        <ProfesionTable />
      </div>
    </DashboardLayout>
  )
}