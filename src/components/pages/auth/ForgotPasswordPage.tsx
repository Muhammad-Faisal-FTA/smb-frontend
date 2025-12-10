"use client";

import { useState } from "react";
import {
  TrendingUp,
  Mail,
  Lock,
  Key,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postApiResponse } from "@/utils/ApiResponse";

// Define the steps for better readability
type Step = "EMAIL" | "OTP" | "NEW_PASSWORD" | "SUCCESS";

export function ForgotPasswordPage() {
  const router = useRouter();

  // State for Flow Control
  const [currentStep, setCurrentStep] = useState<Step>("EMAIL");

  // Form Data States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  // --- Handlers for each step ---

  // Step 1: Submit Email -> Request OTP
  const handleEmailSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { email };
      const result = await postApiResponse(`/pass/forgot-password` , payload);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    // TODO: API Call to send OTP to email
    console.log("Sending OTP to:", email);
    setError("");
    setCurrentStep("OTP");
  };

  // Step 2: Submit OTP -> Verify Code
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: collect the otp code and go to next step setNewPassword
    if (otp.length < 4) {
      setError("Please enter a valid code");
      return;
    }
    console.log("Verifying OTP:", otp);
    setError("");
    setCurrentStep("NEW_PASSWORD");
  };
  
  // Step 3: Submit New Password -> Update Account
  const handlePasswordSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API Call to check  the otp and update password
    const payload = { otp, newPassword };
    try {
      const result = await postApiResponse(`/newpass/reset-password`, payload);
      console.log(result); 
      console.log(payload)   
    } catch (error) {
      console.log(error)
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    // TODO: API Call to update password
    console.log("Updating password...");
    setError("");
    setCurrentStep("SUCCESS");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding (Static) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">FinancePulse</h1>
          <p className="text-slate-600">
            AI-Powered Financial Health Dashboard
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* --- STEP 1: ENTER EMAIL --- */}
          {currentStep === "EMAIL" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Reset Password
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Enter your email to receive a verification code.
                </p>
              </div>

              <div>
                <label className="block text-slate-700 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-medium"
              >
                Send Code <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* --- STEP 2: ENTER OTP --- */}
          {currentStep === "OTP" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Enter Code
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  We sent a code to{" "}
                  <span className="font-semibold">{email}</span>
                </p>
              </div>

              <div>
                <label className="block text-slate-700 mb-2 text-sm font-medium">
                  Verification Code
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest"
                    placeholder="123456"
                    required
                    suppressHydrationWarning
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                Verify Code
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep("EMAIL")}
                className="w-full text-sm text-slate-500 hover:text-slate-800 mt-2"
              >
                Wrong email? Go back
              </button>
            </form>
          )}

          {/* --- STEP 3: NEW PASSWORD --- */}
          {currentStep === "NEW_PASSWORD" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Set New Password
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Create a strong password for your account.
                </p>
              </div>

              <div>
                <label className="block text-slate-700 mb-2 text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2 text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                Reset Password
              </button>
            </form>
          )}

          {/* --- STEP 4: SUCCESS --- */}
          {currentStep === "SUCCESS" && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Password Reset!
              </h2>
              <p className="text-slate-600 mb-6">
                Your password has been successfully updated. You can now log in
                with your new credentials.
              </p>

              <Link
                href="/login"
                className="w-full block bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-all font-medium"
              >
                Back to Login
              </Link>
            </div>
          )}

          {/* Global Back Link (Only show on first step) */}
          {currentStep === "EMAIL" && (
            <div className="mt-6 text-center border-t border-slate-100 pt-6">
              <Link
                href="/login"
                className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-slate-500 mt-6">
          © {new Date().getFullYear()} FinancePulse. All rights reserved.
        </p>
      </div>
    </div>
  );
}