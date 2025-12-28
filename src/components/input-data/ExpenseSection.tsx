'use client';

import { useState, useEffect } from 'react';
import { TrendingDown, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { postApiResponseS } from '@/utils/ApiResponse';


interface ExpenseSectionProps {
  onCompletionChange: (percentage: number) => void;
}

export function ExpenseSection({ onCompletionChange }: ExpenseSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    operatingExpenses: '',
    rentUtilities: '',
    payroll: '',
    marketingSpend: '',
    inventoryPurchases: '',
    loanInstallments: '',
    taxPayments: '',
  });

  const totalFields = Object.keys(formData).length;

  const endPoint = "/input/expenses/insert";

  useEffect(() => {
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    onCompletionChange(Math.round((filledFields / totalFields) * 100));
  }, [formData, totalFields]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const buildPayload = () => ({
    periodValue: new Date().toISOString().slice(0, 7), // "YYYY-MM"

    operatingExpenses: Number(formData.operatingExpenses),

    rentUtilities: Number(formData.rentUtilities),

    salaryExpenses: Number(formData.payroll),

    marketingExpenses: Number(formData.marketingSpend),

    inventoryPurchases: Number(formData.inventoryPurchases),

    loanInstallments: Number(formData.loanInstallments),

    taxPayments: Number(formData.taxPayments),
  });


  const handleInsert = () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = buildPayload();
      if (!token) {
        console.log("Token not found in revenue form.");
      }
      const result = postApiResponseS(endPoint, payload, token);
      console.log("result", result);
      alert("Revenue data saved!");
    } catch (error) {
      console.log("result", error);

      alert("Revenue data Failed!");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Expense Inputs</h3>
            <p className="text-slate-600">Operating costs and expenses</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">
                Operating Expenses (Monthly)
              </label>
              <input
                type="number"
                value={formData.operatingExpenses}
                onChange={(e) =>
                  handleChange("operatingExpenses", e.target.value)
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">
                Rent & Utilities (Monthly)
              </label>
              <input
                type="number"
                value={formData.rentUtilities}
                onChange={(e) => handleChange("rentUtilities", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">
                Payroll (Monthly)
              </label>
              <input
                type="number"
                value={formData.payroll}
                onChange={(e) => handleChange("payroll", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">
                Marketing Spend (Monthly)
              </label>
              <input
                type="number"
                value={formData.marketingSpend}
                onChange={(e) => handleChange("marketingSpend", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">
                Inventory Purchases (Monthly)
              </label>
              <input
                type="number"
                value={formData.inventoryPurchases}
                onChange={(e) =>
                  handleChange("inventoryPurchases", e.target.value)
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">
                Loan Installments (Monthly)
              </label>
              <input
                type="number"
                value={formData.loanInstallments}
                onChange={(e) =>
                  handleChange("loanInstallments", e.target.value)
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">
                Tax Payments (Monthly)
              </label>
              <input
                type="number"
                value={formData.taxPayments}
                onChange={(e) => handleChange("taxPayments", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={() =>
                setFormData({
                  operatingExpenses: "",
                  rentUtilities: "",
                  payroll: "",
                  marketingSpend: "",
                  inventoryPurchases: "",
                  loanInstallments: "",
                  taxPayments: "",
                })
              }
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Validate</span>
            </button>
            <button
              onClick={handleInsert}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Insert</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}