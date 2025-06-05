
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import ScheduleTable from "@/components/schedule/scheduleTable";



export default function HorarioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Horarios</h1>
     
        <ScheduleTable />
      </div>
    </DashboardLayout>
  )
}