import { CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FEATURES = {
  settings: false, // flip when production-ready
};

export function SettingsUnavailableModal({ onClose }: { onClose: () => void }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Container with responsive max-width */}
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 sm:p-8">
          {!showForm ? (
            <>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                Settings — Coming Online Soon
              </h2>

              <div className="mt-4 space-y-3">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  We’re finalizing this section to meet our reliability and
                  security standards.
                </p>
                <p className="text-slate-500 text-sm italic">
                  You can continue using all core features without interruption.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                <button
                  onClick={onClose}
                  className="order-2 sm:order-1 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="order-1 sm:order-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                >
                  Get Notified
                </button>
              </div>
            </>
          ) : (
            <GetNotifiedForm onBack={() => setShowForm(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export function GetNotifiedForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Call
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4 animate-in slide-in-from-bottom-2 duration-300">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          You’re on the list!
        </h3>
        <p className="text-slate-600 mt-2 mb-8">
          We’ll notify you as soon as Settings are available.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Get Notified</h2>
        <button
          type="button"
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">
          Notify me about:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Settings", "Updates", "Automation", "Backup", "Transactions", "Ai specific suggestions"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                onChange={() =>
                  setFeatures((prev) =>
                    prev.includes(item)
                      ? prev.filter((f) => f !== item)
                      : [...prev, item]
                  )
                }
              />
              <span className="text-sm text-slate-600">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Role (Optional)
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
        >
          <option value="">Select your role</option>
          <option>Business Owner</option>
          <option>Finance Manager</option>
          <option>Accountant</option>
          <option>Operations</option>
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          Keep Me Updated
        </button>
        <p className="text-center text-xs text-slate-400 mt-4">
          🔒 No spam. Only product updates.
        </p>
      </div>
    </form>
  );
}
