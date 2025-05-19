// src/app/profile/page.tsx

"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import ProfileEdit from "@/components/userProfile/userProfileForm";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold text-customBlue text-center">Gestión de Perfil</h1>
     
        <ProfileEdit />
      </div>
    </DashboardLayout>
  )
}