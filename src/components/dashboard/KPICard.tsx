'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  status: 'good' | 'moderate' | 'critical';
  period: string;
}

export function KPICard({ title, value, change, trend, icon: Icon, status, period }: KPICardProps) {
  const statusColors = {
    good: { from: '#10B981', to: '#059669' },
    moderate: { from: '#F59E0B', to: '#D97706' },
    critical: { from: '#EF4444', to: '#DC2626' },
  };

  const borderColors = {
    good: { border: '#A7F3D0', bg: '#D1FAE5' },
    moderate: { border: '#FCD34D', bg: '#FEF3C7' },
    critical: { border: '#FECACA', bg: '#FEE2E2' },
  };

  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? '#10B981' : '#EF4444';

  return (
    <div 
      className="rounded-xl p-4 sm:p-6 border-2 shadow-sm hover:shadow-md transition-all"
      style={{ 
        backgroundColor: '#FFFFFF',
        borderColor: borderColors[status].border,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${statusColors[status].from}, ${statusColors[status].to})`,
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-1" style={{ color: trendColor }}>
          <TrendIcon className="w-4 h-4" />
          <span>{change}</span>
        </div>
      </div>
      
      <h3 style={{ color: '#111827' }} className="mb-1">{value}</h3>
      <p style={{ color: '#4B5563' }} className="mb-1">{title}</p>
      <p style={{ color: '#6B7280' }}>{period}</p>
    </div>
  );
}
