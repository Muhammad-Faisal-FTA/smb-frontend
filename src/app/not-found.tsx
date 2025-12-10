import Link from "next/link";
import { FileQuestion, ArrowLeft, Home, Search } from "lucide-react";
import { Metadata } from "next";

// 1. Static Metadata for SEO and performance (Zero JS overhead for title)
export const metadata: Metadata = {
  title: "404 - Page Not Found | FinancePulse",
  description: "The page you are looking for has been audited and removed.",
};

export default function NotFound() {
  return (
    // Outer Container: Uses a subtle grid pattern to mimic "Graph Paper" or "Financial Sheets"
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor: Abstract gradients for depth without heavy images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-50" />
        {/* CSS Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Animated Icon Container */}
        <div className="mb-8 relative inline-block">
          {/* Pulse effect behind the icon */}
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75 duration-1000" />
          <div className="relative bg-white p-6 rounded-full shadow-xl border border-slate-100">
            <FileQuestion className="w-16 h-16 text-blue-600" />
          </div>

          {/* Decorative floating elements ("Lost Data") */}
          <div className="absolute -right-4 top-0 text-slate-300 animate-bounce delay-100">
            ?
          </div>
          <div className="absolute -left-4 bottom-0 text-slate-300 animate-bounce delay-700">
            404
          </div>
        </div>

        {/* Financial Themed Copy */}
        <h1 className="text-7xl font-bold text-slate-900 mb-2 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Transaction Failed
        </h2>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. It might have
          been audited, deducted, or never existed in the ledger.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all w-full sm:w-auto font-medium group"
          >
            <Home className="w-4 h-4" />
            <span>Return Dashboard</span> {/* handle the login condition */}
          </Link>

          <button
            // In a real app, this might toggle a search modal
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto font-medium"
          >
            <Search className="w-4 h-4" /> {/* Placeholder action */}
            <span>Search Ledger</span>
          </button>
        </div>

        {/* Footer Helper */}
        <div className="mt-12 pt-8 border-t border-slate-200/60">
          <p className="text-slate-500 text-sm">
            Lost? {/* mailto:support@financepulse.com */}
            <a
              href="mailto:zumuhammad65@gmail.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Contact Support
            </a>{" "}
            for a manual audit.
          </p>
        </div>
      </div>
    </div>
  );
}
