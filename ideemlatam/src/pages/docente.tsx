
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import TeacherTable from "@/components/teacher/teacherTable";




export default function TeacherPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Docentes </h1>
     
        <TeacherTable />
      </div>
    </DashboardLayout>
  )
}