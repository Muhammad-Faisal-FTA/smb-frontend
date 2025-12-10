"use client";

import { RegisterPage } from "@/components/pages/auth/RegisterPage";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    // Handle successful login here
    router.push("/verification"); // Redirect to onboarding after successful registration.
  };

  return <RegisterPage onRegister={handleRegister} />;
}
