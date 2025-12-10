"use client";
import { EmailVerification } from "@/components/pages/auth/EmailVerification";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const onVerification = () => {
    // Handle successful login here
    router.push("/onboarding"); // Redirect to dashboard after success full login.
  };

  return <EmailVerification onVerification={onVerification} />;
}
