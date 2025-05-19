
"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import Company from "@/components/company/companyTable";



export default function AreaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión  de Empresas</h1>
     
        <Company />
      </div>
    </DashboardLayout>
  )
}