'use client';

import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function AIHealthSummary() {
  return (
    <div 
      className="rounded-xl p-4 sm:p-6 text-white shadow-xl"
      style={{ background: 'linear-gradient(to bottom right, #4F46E5, #6366F1)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-white mb-1">AI Financial Health Summary</h2>
          <p style={{ color: '#E0E7FF' }}>Generated analysis based on your latest data</p>
        </div>
      </div>

      <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <p className="text-white leading-relaxed">
          Your business is showing <strong>strong performance</strong> this month with revenue growth outpacing expenses. 
          However, your liquidity ratio has decreased slightly, suggesting you should maintain closer monitoring of cash reserves. 
          Revenue forecasts indicate a potential <strong>15% growth</strong> over the next quarter based on current trends.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#6EE7B7' }} />
          <div>
            <p className="text-white">Revenue growth is exceeding industry benchmarks</p>
            <p style={{ color: '#E0E7FF' }}>+12.5% above average for your sector</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FCD34D' }} />
          <div>
            <p className="text-white">Marketing expenses increased 45% this month</p>
            <p style={{ color: '#E0E7FF' }}>Consider reviewing ROI on recent campaigns</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7DD3FC' }} />
          <div>
            <p className="text-white">Optimal time to invest in growth initiatives</p>
            <p style={{ color: '#E0E7FF' }}>Based on cash flow projections and runway analysis</p>
          </div>
        </div>
      </div>

      <button 
        className="w-full mt-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        style={{ backgroundColor: '#FFFFFF', color: '#4F46E5' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EEF2FF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
      >
        <Sparkles className="w-4 h-4" />
        <span>View Detailed AI Insights</span>
      </button>
    </div>
  );
}
