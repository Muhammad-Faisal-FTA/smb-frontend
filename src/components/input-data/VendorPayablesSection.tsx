'use client';

import { useState, useEffect } from 'react';
import { Building, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { postApiResponseS } from '@/utils/ApiResponse';

interface VendorPayablesSectionProps {
  onCompletionChange: (percentage: number) => void;
}

const toNumber = (value: string) => (value === "" ? 0 : Number(value));

export function VendorPayablesSection({ onCompletionChange }: VendorPayablesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    totalVendors: '',
    payablesAging: '',
    avgPurchaseValue: '',
    paymentTerms: '',
    advancePaymentsPercentage: '',
    earlyPaymentDiscounts: '',
  });

  const endPoint = "/input/vendor-payables/monthly"; 
  const buildPayload = () => {
    return {
      periodType: "monthly", // extensible
      periodValue: new Date().toISOString().slice(0, 7), // YYYY-MM

      totalVendors: toNumber(formData.totalVendors),

      payablesAging: formData.payablesAging.trim(),
      // later this can evolve to:
      // { days30, days60, days90 }

      avgPurchaseValue: toNumber(formData.avgPurchaseValue),

      paymentTerms: formData.paymentTerms.trim(),

      advancePaymentsPercentage: toNumber(formData.advancePaymentsPercentage),

      earlyPaymentDiscounts: toNumber(formData.earlyPaymentDiscounts),
    };
  };

  const totalFields = Object.keys(formData).length;

  useEffect(() => {
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    onCompletionChange(Math.round((filledFields / totalFields) * 100));
  }, [formData, totalFields]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInsert = () => {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = buildPayload()
        if(!token){
          console.log("Token not found in revenue form.")
        }
        const result = postApiResponseS(endPoint, payload, token )
        console.log("result", result)
        alert('Revenue data saved!');
      } catch (error) {
        console.log("result", error)
        
        alert('Revenue data Failed!');
      }
    };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Vendor & Payables</h3>
            <p className="text-slate-600">Supplier and payment obligations</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            {Object.values(formData).filter(v => v).length}/{totalFields} complete
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">Total Vendors</label>
              <input
                type="number"
                value={formData.totalVendors}
                onChange={(e) => handleChange('totalVendors', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Payables Aging (Days)</label>
              <input
                type="number"
                value={formData.payablesAging}
                onChange={(e) => handleChange('payablesAging', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Average Purchase Value</label>
              <input
                type="number"
                value={formData.avgPurchaseValue}
                onChange={(e) => handleChange('avgPurchaseValue', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Payment Terms</label>
              <select
                value={formData.paymentTerms}
                onChange={(e) => handleChange('paymentTerms', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select terms</option>
                <option value="immediate">Immediate/COD</option>
                <option value="net15">Net 15</option>
                <option value="net30">Net 30</option>
                <option value="net60">Net 60</option>
                <option value="net90">Net 90</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Advance Payments %</label>
              <input
                type="number"
                value={formData.advancePaymentsPercentage}
                onChange={(e) => handleChange('advancePaymentsPercentage', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Early Payment Discounts %</label>
              <input
                type="number"
                value={formData.earlyPaymentDiscounts}
                onChange={(e) => handleChange('earlyPaymentDiscounts', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={() => setFormData({
                totalVendors: '', payablesAging: '', avgPurchaseValue: '',
                paymentTerms: '', advancePaymentsPercentage: '', earlyPaymentDiscounts: '',
              })}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Validate</span>
            </button>
            <button onClick={handleInsert}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Insert</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}