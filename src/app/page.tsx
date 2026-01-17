"use client";

import { useRouter } from "next/navigation";
import { LoginPage } from "@/components/pages/auth/LoginPage";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return <LoginPage onLogin={handleLogin} />;
}
