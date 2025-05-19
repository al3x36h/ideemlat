// src/pages/login.tsx
import LoginForm from "@/components/login/loginForm";
import { useLogin } from "@/hooks/useLogin";



export default function LoginPage() {


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}


