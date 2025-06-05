
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import StudentTable from "@/components/student/studentTable";




export default function StudentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Estudiantes </h1>
     
        <StudentTable />
      </div>
    </DashboardLayout>
  )
}