"use client";

import { LoginPage } from "@/components/pages/auth/LoginPage";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Handle successful login here
    router.push("/dashboard"); // Redirect to dashboard after success full login.
  };

  return <LoginPage onLogin={handleLogin} />;
}
