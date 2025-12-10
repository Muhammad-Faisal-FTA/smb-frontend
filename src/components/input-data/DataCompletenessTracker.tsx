'use client';

import { CheckCircle, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';

interface DataCompletenessTrackerProps {
  completion: {
    businessProfile: number;
    revenue: number;
    expense: number;
    assetsLiabilities: number;
    customerReceivables: number;
    vendorPayables: number;
    transactionSummary: number;
  };
}

export function DataCompletenessTracker({ completion }: DataCompletenessTrackerProps) {
  const sections = [
    { id: 'businessProfile', label: 'Business Profile', value: completion.businessProfile },
    { id: 'revenue', label: 'Revenue Data', value: completion.revenue },
    { id: 'expense', label: 'Expense Data', value: completion.expense },
    { id: 'assetsLiabilities', label: 'Assets & Liabilities', value: completion.assetsLiabilities },
    { id: 'customerReceivables', label: 'Customer & Receivables', value: completion.customerReceivables },
    { id: 'vendorPayables', label: 'Vendor & Payables', value: completion.vendorPayables },
    { id: 'transactionSummary', label: 'Transaction Summary', value: completion.transactionSummary },
  ];

  const totalCompletion = Math.round(
    Object.values(completion).reduce((sum, val) => sum + val, 0) / Object.keys(completion).length
  );

  const aiConfidence = Math.min(95, Math.round(totalCompletion * 0.85 + 10));

  return (
    <div className="lg:sticky lg:top-8 w-full lg:w-80 space-y-4">
      {/* AI Confidence Score */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-white">AI Confidence Score</h3>
        </div>
        
        <div className="flex items-end gap-2 mb-3">
          <p className="text-white">{aiConfidence}%</p>
          <TrendingUp className="w-6 h-6 mb-1" />
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 mb-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${aiConfidence}%` }}
          />
        </div>

        <p className="text-blue-100 leading-relaxed">
          {aiConfidence >= 80
            ? 'Excellent! Your data provides high-confidence forecasting.'
            : aiConfidence >= 60
            ? 'Good progress. Complete more sections for better accuracy.'
            : 'Add more data to unlock accurate AI predictions.'}
        </p>
      </div>

      {/* Data Completeness */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900">Data Completeness</h3>
          <span className="text-slate-900">{totalCompletion}%</span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
          <div
            className={`rounded-full h-2 transition-all duration-500 ${
              totalCompletion >= 80
                ? 'bg-green-500'
                : totalCompletion >= 60
                ? 'bg-blue-500'
                : totalCompletion >= 40
                ? 'bg-orange-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${totalCompletion}%` }}
          />
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {section.value === 100 ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : section.value > 0 ? (
                    <div className="w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                  ) : (
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-slate-700">{section.label}</span>
                </div>
                <span className="text-slate-600">{section.value}%</span>
              </div>
              <div className="ml-6 w-full bg-slate-200 rounded-full h-1">
                <div
                  className={`rounded-full h-1 transition-all duration-300 ${
                    section.value === 100
                      ? 'bg-green-500'
                      : section.value > 0
                      ? 'bg-orange-500'
                      : 'bg-slate-300'
                  }`}
                  style={{ width: `${section.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h4 className="text-slate-900 mb-3">Quick Tips</h4>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Complete all required fields for optimal AI accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Use the validate button to check for errors</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Save your progress regularly</span>
          </li>
        </ul>
      </div>
    </div>
  );
}