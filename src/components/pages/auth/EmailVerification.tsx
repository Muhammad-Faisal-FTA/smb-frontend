"use client";
import { useState } from "react";
import { TrendingUp, Key, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { postApiResponse } from "@/utils/ApiResponse";

export function EmailVerification({
  onVerification,
}: {
  onVerification: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
   const userId = localStorage.getItem("userId");
  const endpoint = `/otp/verify-email`;
  // handler for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // api integration
    try {
      console.log("Verifying for userId:",userId)
      const payload = {userId, verificationCode: otp };
      const result = await postApiResponse(endpoint, payload);
      console.log(result);
      onVerification();
    } catch (error) {
      console.log(error);
      const payload = {userId: userId, verificationCode: otp };
      console.log("Pay load for the email verification : ", payload);
    }
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Verifying code:", otp);
      setIsLoading(false);
      // Redirect or show success here
    }, 1500);
  };

  const handleResend = () => {
    console.log("Resending code...");
    // Add resend logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            FinancePulse
          </h1>
          <p className="text-slate-600">Verify your identity</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900">
                Check your email
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                We&apos;ve sent a 6-digit verification code to <br />
                <span className="font-semibold text-slate-900">
                  {/* email address that the code was sent to. */}
                </span>
              </p>
            </div>

            {/* OTP Input */}
            <div>
              <label className="block text-slate-700 mb-2 text-sm font-medium">
                Verification Code
              </label>
              <div className="relative group">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all tracking-[0.5em] font-semibold text-slate-900 placeholder:tracking-normal"
                  placeholder="123456"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-medium shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                "Verifying..."
              ) : (
                <>
                  Verify Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Resend Section */}
            <div className="text-center border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-600 mb-3">
                Didn&apos;t receive the code?
              </p>
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Click to resend
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8">
          <Link
            href="/login"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
