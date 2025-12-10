"use client";
// to reset password"use client";

import { ForgotPasswordPage } from "@/components/pages/auth/ForgotPasswordPage";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  // const handleReset = () => {
  //   // Handle successful password reset request here
  //   router.push("/login");
  // };

  return <ForgotPasswordPage />;
}
