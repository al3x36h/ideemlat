"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import ChangePassword from "@/components/changePassword/changePassword";

export default function PasswordPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Contraseña</h1>
     
        <ChangePassword />
      </div>
    </DashboardLayout>
  )
}