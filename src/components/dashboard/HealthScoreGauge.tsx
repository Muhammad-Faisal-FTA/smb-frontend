'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export function HealthScoreGauge() {
  const [score, setScore] = useState(78); // Health score out of 100
  const circumference = 2 * Math.PI * 70; // radius = 70
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return { color: '#10B981', label: 'Excellent', bg: { from: '#10B981', to: '#059669' } };
    if (score >= 60) return { color: '#F59E0B', label: 'Good', bg: { from: '#F59E0B', to: '#D97706' } };
    if (score >= 40) return { color: '#F97316', label: 'Fair', bg: { from: '#F97316', to: '#EF4444' } };
    return { color: '#EF4444', label: 'Poor', bg: { from: '#EF4444', to: '#DC2626' } };
  };

  const scoreData = getScoreColor(score);

  const factors = [
    { label: 'Cash Position', score: 85, icon: CheckCircle, status: 'good' },
    { label: 'Revenue Growth', score: 88, icon: CheckCircle, status: 'good' },
    { label: 'Profit Margin', score: 75, icon: CheckCircle, status: 'good' },
    { label: 'Liquidity Ratio', score: 58, icon: AlertTriangle, status: 'moderate' },
    { label: 'Expense Control', score: 72, icon: Info, status: 'good' },
  ];

  return (
    <div className="rounded-xl p-4 sm:p-6 border shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}>
      <div className="mb-6">
        <h3 style={{ color: '#111827' }} className="mb-1">Business Health Score</h3>
        <p style={{ color: '#4B5563' }}>Overall financial wellness indicator</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        {/* Circular Gauge */}
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="#D1D5DB"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke={scoreData.color}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
              style={{ 
                background: `linear-gradient(to bottom right, ${scoreData.bg.from}, ${scoreData.bg.to})` 
              }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p style={{ color: '#111827' }}>{score}</p>
            <p style={{ color: '#4B5563' }}>out of 100</p>
          </div>
        </div>

        {/* Status Label */}
        <div className="mt-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: `${scoreData.color}20`, color: scoreData.color }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreData.color }} />
            <span className="font-medium">{scoreData.label} Health</span>
          </div>
        </div>
      </div>

      {/* Health Factors */}
      <div className="space-y-3">
        <p style={{ color: '#111827' }}>Contributing Factors</p>
        {factors.map((factor, index) => {
          const Icon = factor.icon;
          const statusColor = 
            factor.status === 'good' ? '#10B981' :
            factor.status === 'moderate' ? '#F59E0B' :
            '#4B5563';

          const barColor = 
            factor.status === 'good' ? '#10B981' :
            factor.status === 'moderate' ? '#F59E0B' :
            '#EF4444';

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: statusColor }} />
                  <span style={{ color: '#111827' }}>{factor.label}</span>
                </div>
                <span style={{ color: '#4B5563' }}>{factor.score}%</span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{ backgroundColor: '#E5E7EB' }}>
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${factor.score}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4" style={{ borderTop: '1px solid #D1D5DB' }}>
        <p style={{ color: '#4B5563' }} className="leading-relaxed">
          Your business health score is calculated using 5 key financial metrics. 
          Focus on improving your liquidity ratio to reach excellent status.
        </p>
      </div>
    </div>
  );
}
