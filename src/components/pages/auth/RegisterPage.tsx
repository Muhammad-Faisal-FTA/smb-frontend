'use client';
// RegisterPage.tsx
import { useState } from 'react';
import { TrendingUp, Mail, User, Phone, Lock, ArrowRight } from "lucide-react";
import { postApiResponse } from '@/utils/ApiResponse';
interface RegisterPageProps {
  // onRegister is a callback function that runs when user successfully registers.
  onRegister: () => void;
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
  const [fullName, setfullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const endpoint = `/auth/user-register`;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let userId = ''; // Placeholder for userId
    try {
      const payload = { fullName, phoneNumber, email, password };
      const result = await postApiResponse(endpoint, payload);
           userId = result.user._id; // assuming the API returns userId
           localStorage.setItem("userId", userId);
      console.log(`Registration successful results: ${userId}`);
    } catch (error) {
      console.log(error);
      return
    }
    onRegister();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">FinancePulse</h1>
          <p className="text-slate-600">
            AI-Powered Financial Health Dashboard
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-slate-900 mb-2">Create an account</h2>
          <p className="text-slate-600 mb-6">
            Register here to get started with FinancePulse.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* fullName */}
            <div>
              <label className="block text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your full name"
                  required
                  suppressHydrationWarning={true} // prevent browser extensions in development mode
                />
              </div>
            </div>
            {/* phoneNo */}
            <label className="block text-slate-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+92 300 1234567"
                required
                suppressHydrationWarning={true} // prevent browser extensions in development mode
              />
            </div>
            {/* email */}
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
                  suppressHydrationWarning={true} // prevent browser extensions in development mode
                />
              </div>
            </div>
            {/*password*/}
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
              Have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Login
              </a>
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