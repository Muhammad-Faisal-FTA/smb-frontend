"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  ChevronDown,
  ChevronUp,
  Save,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { postApiResponseS } from "@/utils/ApiResponse.js";
interface FinancialSectionProps {
  onCompletionChange: (percentage: number) => void;
}

export function FinancialHealthSection({
  onCompletionChange,
}: FinancialSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    periodStart: "2024-01-01",
    periodEnd: "2024-12-31",

    cash: "",
    bankBalance: "",
    accountsReceivable: "",
    inventory: "",
    currentAssetsOther: "",

    currentLiabilities: "",
    payables: "",
    totalDebt: "",
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

    scoreLH: "",
    scorePH: "",
    scoreCS: "",
    scoreEH: "",
    scoreSH: "",
    financialHealthScore: "",
  });

  const totalFields = Object.keys(formData).length;

  useEffect(() => {
    const filled = Object.values(formData).filter((v) => v !== "").length;
    onCompletionChange(Math.round((filled / totalFields) * 100));
  }, [formData, totalFields, onCompletionChange]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔐 Payload builder (no userId – backend injects it)
  const buildPayload = () => ({
    periodStart: formData.periodStart,
    periodEnd: formData.periodEnd,

    cash: Number(formData.cash),
    bankBalance: Number(formData.bankBalance),
    accountsReceivable: Number(formData.accountsReceivable),
    inventory: Number(formData.inventory),
    currentAssetsOther: Number(formData.currentAssetsOther),

    currentLiabilities: Number(formData.currentLiabilities),
    payables: Number(formData.payables),
    totalDebt: Number(formData.totalDebt),
    totalEquity: Number(formData.totalEquity),

    revenue: Number(formData.revenue),
    cogs: Number(formData.cogs),
    grossProfit: Number(formData.grossProfit),
    operatingExpenses: Number(formData.operatingExpenses),
    monthlyOperatingExpenses: Number(formData.monthlyOperatingExpenses),
    netProfit: Number(formData.netProfit),
    ebitda: Number(formData.ebitda),
    interestExpense: Number(formData.interestExpense),

    avgInventory: Number(formData.avgInventory),

    scoreLH: Number(formData.scoreLH),
    scorePH: Number(formData.scorePH),
    scoreCS: Number(formData.scoreCS),
    scoreEH: Number(formData.scoreEH),
    scoreSH: Number(formData.scoreSH),
    financialHealthScore: Number(formData.financialHealthScore),
  });

  const handleSave = async () => {
    try {
      const payload = buildPayload();
      await postApiResponseS("/financial-health", payload);
      alert("Financial data saved successfully");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save financial data");
    }
  };

  const renderInput = (label: string, field: keyof typeof formData) => (
    <div>
      <label className="block text-slate-700 mb-2">{label}</label>
      <input
        type="number"
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="0"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-6 hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Financial Health Data</h3>
            <p className="text-slate-600">Complete financial snapshot</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("Cash", "cash")}
            {renderInput("Bank Balance", "bankBalance")}
            {renderInput("Accounts Receivable", "accountsReceivable")}
            {renderInput("Inventory", "inventory")}
            {renderInput("Other Current Assets", "currentAssetsOther")}
            {renderInput("Current Liabilities", "currentLiabilities")}
            {renderInput("Payables", "payables")}
            {renderInput("Total Debt", "totalDebt")}
            {renderInput("Total Equity", "totalEquity")}
            {renderInput("Revenue", "revenue")}
            {renderInput("COGS", "cogs")}
            {renderInput("Gross Profit", "grossProfit")}
            {renderInput("Operating Expenses", "operatingExpenses")}
            {renderInput(
              "Monthly Operating Expenses",
              "monthlyOperatingExpenses"
            )}
            {renderInput("Net Profit", "netProfit")}
            {renderInput("EBITDA", "ebitda")}
            {renderInput("Interest Expense", "interestExpense")}
            {renderInput("Average Inventory", "avgInventory")}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <button
              onClick={() =>
                setFormData(
                  (prev) =>
                    Object.fromEntries(
                      Object.keys(prev).map((k) => [k, ""])
                    ) as typeof formData
                )
              }
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg flex gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
