"use client"

import DashboardLayout from "@/components/layout/dashboardLayout";
import UserTable from "@/components/user/userTable";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-bold text-customBlue text-center">
          Gestión de Usuarios
        </h1>
        <UserTable />
      </div>
    </DashboardLayout>
  );
}
