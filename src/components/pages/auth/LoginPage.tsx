"use client";
// LoginPage.tsx
import { useState } from "react";
import { TrendingUp, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { postApiResponse } from "@/utils/ApiResponse";

// Note:- TrendingUp, Mail, Lock, ArrowRight are icon components from lucide-react library. TrendingUp is used for logo, Mail for email input, Lock for password input, and ArrowRight for the submit button.

interface LoginPageProps {
  // onLogin is a callback function that runs when user successfully logs in.
  onLogin: () => void;
}

export  function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const endpoint = `/auth/user-login`;

  //=========== Handle Form Submission ===========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    // payload the login logic here, e.g., API call to authenticate user
    try {
      const payload = { email: email, password: password };
      const result =  postApiResponse(endpoint, payload);
      console.log("Login successful:", result);
    } catch (error) {
      console.log(error);
      return; // Exit if login fails
    }
    onLogin(); // Call the onLogin callback to indicate successful login from parent component, e.g., to redirect or update state.
  };

  //=========== UI Structure of the Login Page ===========
  return (
    // Outer Container:- Full-screen gradient background (blue to indigo)
    // Centered flex layout
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/*
         Branding Section:- Logo and App Name 
          Company logo (TrendingUp icon)
          "FinancePulse" title
          Tagline about AI-powered dashboard
        */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">FinancePulse</h1>
          <p className="text-slate-600">
            AI-Powered Financial Health Dashboard
          </p>
        </div>

        {/* 
         Login Card:- 
         White card with shadow and rounded corners
         Contains the login form
        */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-slate-900 mb-2 font-semibold">Welcome back</h2>
          <p className="text-slate-600 mb-6">
            Sign in to your account to continue
          </p>
          {/*Form to capture user credentials */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                  suppressHydrationWarning={true}
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  suppressHydrationWarning={true}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Register
              </Link>{" "}
              here
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 mt-6">
          © {new Date().getFullYear()} FinancePulse. All rights reserved.
        </p>
      </div>
    </div>
  );
}
