
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import Syudy from "@/components/study/studyTable";



export default function EstudioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Estudios</h1>
     
        <Syudy />
      </div>
    </DashboardLayout>
  )
}