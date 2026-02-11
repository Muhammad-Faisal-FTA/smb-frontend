"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  ChevronDown,
  ChevronUp,
  Save,
  RotateCcw,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { postApiResponseS } from "@/utils/ApiResponse";

interface FinancialSectionProps {
  onCompletionChange: (percentage: number) => void;
}
const endpoint = "/finance/business-financial";

// Mock API function - replace with your actual implementation
// const postApiResponseS = async (
//   endpoint: string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   payload: any,
//   token: string | null
// ) => {
//   console.log("Saving to:", endpoint, payload);
//   // Simulate API call
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// };

// ✅ Removed all score fields - backend calculates these
const initialFormData = {
  periodStart: "",
  periodEnd: "",
  cash: "",
  bankBalance: "",
  accountsReceivable: "",
  inventory: "",
  currentAssetsOther: "",
  currentLiabilities: "",
  payables: "",
  totalDebt: "",
  monthlyCashflows: "",
  totalEquity: "",
  revenue: "",
  cogs: "",
  grossProfit: "",
  operatingExpenses: "",
  monthlyOperatingExpenses: "",
  netProfit: "",
  ebitda: "",
  interestExpense: "",
  avgInventory: "",
};

export function FinancialHealthSection({
  onCompletionChange,
}: FinancialSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const totalFields = Object.keys(formData).length;

  useEffect(() => {
    const filled = Object.values(formData).filter((v) => v !== "").length;
    onCompletionChange(Math.round((filled / totalFields) * 100));
  }, [formData, totalFields, onCompletionChange]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Clean payload - backend will calculate and add scores
  const buildPayload = () => ({
    periodStart: formData.periodStart,
    periodEnd: formData.periodEnd,
    cash: formData.cash ? Number(formData.cash) : 0,
    bankBalance: formData.bankBalance ? Number(formData.bankBalance) : 0,
    accountsReceivable: formData.accountsReceivable
      ? Number(formData.accountsReceivable)
      : 0,
    inventory: formData.inventory ? Number(formData.inventory) : 0,
    currentAssetsOther: formData.currentAssetsOther
      ? Number(formData.currentAssetsOther)
      : 0,
    currentLiabilities: formData.currentLiabilities
      ? Number(formData.currentLiabilities)
      : 0,
    payables: formData.payables ? Number(formData.payables) : 0,
    totalDebt: formData.totalDebt ? Number(formData.totalDebt) : 0,
    monthlyCashflows: formData.monthlyCashflows
      ? Number(formData.monthlyCashflows)
      : 0,
    totalEquity: formData.totalEquity ? Number(formData.totalEquity) : 0,
    revenue: formData.revenue ? Number(formData.revenue) : 0,
    cogs: formData.cogs ? Number(formData.cogs) : 0,
    grossProfit: formData.grossProfit ? Number(formData.grossProfit) : 0,
    operatingExpenses: formData.operatingExpenses
      ? Number(formData.operatingExpenses)
      : 0,
    monthlyOperatingExpenses: formData.monthlyOperatingExpenses
      ? Number(formData.monthlyOperatingExpenses)
      : 0,
    netProfit: formData.netProfit ? Number(formData.netProfit) : 0,
    ebitda: formData.ebitda ? Number(formData.ebitda) : 0,
    interestExpense: formData.interestExpense
      ? Number(formData.interestExpense)
      : 0,
    avgInventory: formData.avgInventory ? Number(formData.avgInventory) : 0,
    // Backend will calculate and add:
    // scoreLH, scorePH, scoreCS, scoreEH, scoreSH, financialHealthScore
  });

  const handleSave = async () => {
    // Validate required fields
    if (!formData.periodStart || !formData.periodEnd) {
      setMessage("Period start and end dates are required");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Check if dates are valid
    const start = new Date(formData.periodStart);
    const end = new Date(formData.periodEnd);
    if (start > end) {
      setMessage("Period end must be after period start");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      // Safe localStorage access
      if (typeof window === "undefined") {
        throw new Error("Cannot access localStorage on server");
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMessage("Please log in first");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      const payload = buildPayload();
      await postApiResponseS(endpoint, payload, token);

      setMessage(
        "✓ Financial data saved successfully! Scores calculated by backend.",
      );
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Save failed:", error);
      setMessage("Failed to save financial data");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleValidate = () => {
    const errors: string[] = [];

    if (!formData.periodStart) errors.push("Period start is required");
    if (!formData.periodEnd) errors.push("Period end is required");

    // Validation: COGS shouldn't exceed Revenue
    if (formData.revenue && formData.cogs) {
      const rev = Number(formData.revenue);
      const cogs = Number(formData.cogs);
      if (cogs > rev) {
        errors.push("COGS cannot exceed Revenue");
      }
    }

    // Validation: Gross Profit should equal Revenue - COGS
    if (formData.revenue && formData.cogs && formData.grossProfit) {
      const expectedGrossProfit =
        Number(formData.revenue) - Number(formData.cogs);
      const actualGrossProfit = Number(formData.grossProfit);
      if (Math.abs(expectedGrossProfit - actualGrossProfit) > 0.01) {
        errors.push(
          `Gross Profit should be ${expectedGrossProfit.toFixed(
            2,
          )} (Revenue - COGS)`,
        );
      }
    }

    // Validation: Current Assets should be positive
    const totalAssets =
      (Number(formData.cash) || 0) +
      (Number(formData.bankBalance) || 0) +
      (Number(formData.accountsReceivable) || 0) +
      (Number(formData.inventory) || 0);

    if (totalAssets === 0) {
      errors.push("At least one asset value should be entered");
    }

    if (errors.length > 0) {
      setMessage("⚠ " + errors.join(". "));
      setTimeout(() => setMessage(""), 5000);
    } else {
      setMessage("✓ Validation passed! Ready to save.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const renderNumberInput = (
    label: string,
    field: keyof typeof formData,
    prefix?: string,
  ) => (
    <div>
      <label className="block text-slate-700 mb-2 font-medium">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className={`w-full ${
            prefix ? "pl-8" : "pl-4"
          } pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="0"
          step="0.01"
        />
      </div>
    </div>
  );

  const renderDateInput = (label: string, field: keyof typeof formData) => (
    <div>
      <label className="block text-slate-700 mb-2 font-medium">{label}</label>
      <input
        type="date"
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900 font-semibold">
              Financial Health Data
            </h3>
            <p className="text-slate-600 text-sm">
              Complete financial snapshot
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600 text-sm">
            {Object.values(formData).filter((v) => v).length}/{totalFields}{" "}
            complete
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-200">
          {/* Message Display */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes("✓")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : message.includes("⚠")
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Note:</strong> Financial health scores (Liquidity,
              Profitability, Cash Stability, Efficiency, Solvency) will be
              automatically calculated by our backend after you save this data.
            </p>
          </div>

          {/* Period Section */}
          <div className="mb-6">
            <h4 className="text-slate-900 font-semibold mb-3">
              Reporting Period
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderDateInput("Period Start", "periodStart")}
              {renderDateInput("Period End", "periodEnd")}
            </div>
          </div>

          {/* Assets Section */}
          <div className="mb-6">
            <h4 className="text-slate-900 font-semibold mb-3">
              Current Assets
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderNumberInput("Cash", "cash", "$")}
              {renderNumberInput("Bank Balance", "bankBalance", "$")}
              {renderNumberInput(
                "Accounts Receivable",
                "accountsReceivable",
                "$",
              )}
              {renderNumberInput("Inventory", "inventory", "$")}
              {renderNumberInput("Average Inventory", "avgInventory", "$")}
              {renderNumberInput(
                "Other Current Assets",
                "currentAssetsOther",
                "$",
              )}
            </div>
          </div>

          {/* Liabilities & Equity Section */}
          <div className="mb-6">
            <h4 className="text-slate-900 font-semibold mb-3">
              Liabilities & Equity
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderNumberInput(
                "Current Liabilities",
                "currentLiabilities",
                "$",
              )}
              {renderNumberInput("Payables", "payables", "$")}
              {renderNumberInput("Total Debt", "totalDebt", "$")}
              {renderNumberInput("Monthly Cashflows", "monthlyCashflows", "$")}
              {renderNumberInput("Total Equity", "totalEquity", "$")}
            </div>
          </div>

          {/* Revenue & Profitability Section */}
          <div className="mb-6">
            <h4 className="text-slate-900 font-semibold mb-3">
              Revenue & Profitability
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderNumberInput("Revenue", "revenue", "$")}
              {renderNumberInput("Cost of Goods Sold (COGS)", "cogs", "$")}
              {renderNumberInput("Gross Profit", "grossProfit", "$")}
              {renderNumberInput(
                "Operating Expenses",
                "operatingExpenses",
                "$",
              )}
              {renderNumberInput(
                "Monthly Operating Expenses",
                "monthlyOperatingExpenses",
                "$",
              )}
              {renderNumberInput("Net Profit", "netProfit", "$")}
              {renderNumberInput("EBITDA", "ebitda", "$")}
              {renderNumberInput("Interest Expense", "interestExpense", "$")}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              onClick={() => {
                setFormData(initialFormData);
                setMessage("Form reset");
                setTimeout(() => setMessage(""), 2000);
              }}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleValidate}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Validate</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { Wallet, ChevronDown, ChevronUp, Save, RotateCcw, Loader2 } from "lucide-react";

// interface FinancialSectionProps {
//   onCompletionChange: (percentage: number) => void;
// }

// const endpoint = "/finance/business-financial";

// // Mock API function for demo (replace with your actual implementation)
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const postApiResponseS = async (endpoint: string, data: any, token: string | null) => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   if (!token) throw new Error("No token");
//   console.log("Saved:", data);
// };

// const initialFormData = {
//   periodStart: "",
//   periodEnd: "",
//   cash: "",
//   bankBalance: "",
//   accountsReceivable: "",
//   inventory: "",
//   currentAssetsOther: "",
//   currentLiabilities: "",
//   payables: "",
//   totalDebt: "",
//   totalEquity: "",
//   revenue: "",
//   cogs: "",
//   grossProfit: "",
//   operatingExpenses: "",
//   monthlyOperatingExpenses: "",
//   netProfit: "",
//   ebitda: "",
//   interestExpense: "",
//   avgInventory: "",
// };

// export default function FinancialHealthSection({
//   onCompletionChange,
// }: FinancialSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveError, setSaveError] = useState<string>("");
//   const [formData, setFormData] = useState(initialFormData);

//   const totalFields = Object.keys(formData).length;

//   // Completion calculation with proper dependencies
//   useEffect(() => {
//     const filled = Object.values(formData).filter((v) => v !== "").length;
//     const percentage = Math.round((filled / totalFields) * 100);
//     onCompletionChange(percentage);
//   }, [formData, onCompletionChange, totalFields]);

//   const handleChange = (field: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setSaveError(""); // Clear error on change
//   };

//   // Validate numeric input
//   const validateNumber = (value: string): boolean => {
//     if (value === "") return true;
//     const num = Number(value);
//     return !isNaN(num) && isFinite(num);
//   };

//   const buildPayload = () => ({
//     periodStart: formData.periodStart,
//     periodEnd: formData.periodEnd,
//     cash: Number(formData.cash) || 0,
//     bankBalance: Number(formData.bankBalance) || 0,
//     accountsReceivable: Number(formData.accountsReceivable) || 0,
//     inventory: Number(formData.inventory) || 0,
//     currentAssetsOther: Number(formData.currentAssetsOther) || 0,
//     currentLiabilities: Number(formData.currentLiabilities) || 0,
//     payables: Number(formData.payables) || 0,
//     totalDebt: Number(formData.totalDebt) || 0,
//     totalEquity: Number(formData.totalEquity) || 0,
//     revenue: Number(formData.revenue) || 0,
//     cogs: Number(formData.cogs) || 0,
//     grossProfit: Number(formData.grossProfit) || 0,
//     operatingExpenses: Number(formData.operatingExpenses) || 0,
//     monthlyOperatingExpenses: Number(formData.monthlyOperatingExpenses) || 0,
//     netProfit: Number(formData.netProfit) || 0,
//     ebitda: Number(formData.ebitda) || 0,
//     interestExpense: Number(formData.interestExpense) || 0,
//     avgInventory: Number(formData.avgInventory) || 0,
//   });

//   const handleSave = async () => {
//     setIsSaving(true);
//     setSaveError("");

//     try {
//       // In your actual app, get token from localStorage
//       const token = "demo-token"; // localStorage.getItem("accessToken");

//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       await postApiResponseS(endpoint, buildPayload(), token);
//       alert("Financial data saved successfully");
//     } catch (error) {
//       const message = error instanceof Error ? error.message : "Failed to save";
//       setSaveError(message);
//       console.error("Save failed:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleReset = useCallback(() => {
//     if (window.confirm("Are you sure you want to reset all fields?")) {
//       setFormData(initialFormData);
//       setSaveError("");
//     }
//   }, []);

//   const renderNumberInput = (label: string, field: keyof typeof formData) => (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-slate-700">
//         {label}
//       </label>
//       <input
//         type="number"
//         step="0.01"
//         value={formData[field]}
//         onChange={(e) => {
//           const value = e.target.value;
//           if (validateNumber(value)) {
//             handleChange(field, value);
//           }
//         }}
//         className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         placeholder="0.00"
//       />
//     </div>
//   );

//   const renderDateInput = (label: string, field: keyof typeof formData) => (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-slate-700">
//         {label}
//       </label>
//       <input
//         type="date"
//         value={formData[field]}
//         onChange={(e) => handleChange(field, e.target.value)}
//         max={new Date().toISOString().split('T')[0]}
//         className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       />
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="w-full flex justify-between items-center p-6 hover:bg-slate-50 transition-colors"
//       >
//         <div className="flex items-center gap-3">
//           <Wallet className="w-6 h-6 text-blue-600" />
//           <div className="text-left">
//             <h3 className="text-lg font-semibold text-slate-900">
//               Financial Health Data
//             </h3>
//             <p className="text-sm text-slate-500">Complete financial snapshot</p>
//           </div>
//         </div>
//         {isExpanded ? (
//           <ChevronUp className="w-5 h-5 text-slate-400" />
//         ) : (
//           <ChevronDown className="w-5 h-5 text-slate-400" />
//         )}
//       </button>

//       {isExpanded && (
//         <div className="p-6 border-t border-slate-200 space-y-6">
//           {saveError && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//               {saveError}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {renderDateInput("Period Start", "periodStart")}
//             {renderDateInput("Period End", "periodEnd")}
//             {renderNumberInput("Cash", "cash")}
//             {renderNumberInput("Bank Balance", "bankBalance")}
//             {renderNumberInput("Accounts Receivable", "accountsReceivable")}
//             {renderNumberInput("Inventory", "inventory")}
//             {renderNumberInput("Other Current Assets", "currentAssetsOther")}
//             {renderNumberInput("Current Liabilities", "currentLiabilities")}
//             {renderNumberInput("Payables", "payables")}
//             {renderNumberInput("Total Debt", "totalDebt")}
//             {renderNumberInput("Total Equity", "totalEquity")}
//             {renderNumberInput("Revenue", "revenue")}
//             {renderNumberInput("COGS", "cogs")}
//             {renderNumberInput("Gross Profit", "grossProfit")}
//             {renderNumberInput("Operating Expenses", "operatingExpenses")}
//             {renderNumberInput("Monthly Operating Expenses", "monthlyOperatingExpenses")}
//             {renderNumberInput("Net Profit", "netProfit")}
//             {renderNumberInput("EBITDA", "ebitda")}
//             {renderNumberInput("Interest Expense", "interestExpense")}
//             {renderNumberInput("Average Inventory", "avgInventory")}
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               onClick={handleSave}
//               disabled={isSaving}
//               className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//             >
//               {isSaving ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-5 h-5" />
//                   Save
//                 </>
//               )}
//             </button>
//             <button
//               onClick={handleReset}
//               disabled={isSaving}
//               className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//             >
//               <RotateCcw className="w-5 h-5" />
//               Reset
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
