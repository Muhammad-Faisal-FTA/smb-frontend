'use client';

import { AlertTriangle, ArrowRight, Bell, AlertCircle, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Low Liquidity Warning',
    message: 'Cash reserves below recommended threshold',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Expense Spike Detected',
    message: 'Marketing spend increased 45%',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'info',
    title: 'Invoice Due Soon',
    message: '3 invoices due in the next 7 days',
    time: '1 day ago',
  },
];

export function AlertsWidget() {
  return (
    <div className="rounded-xl p-4 sm:p-6 border shadow-sm h-full" style={{ backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" style={{ color: '#4B5563' }} />
          <h3 style={{ color: '#111827' }}>Recent Alerts</h3>
        </div>
        <span className="px-2 py-1 rounded-full" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>3 new</span>
      </div>

      <div className="space-y-3 mb-4">
        {alerts.map((alert) => {
          const Icon =
            alert.type === 'critical'
              ? AlertCircle
              : alert.type === 'warning'
              ? AlertTriangle
              : Info;
          
          const styles =
            alert.type === 'critical'
              ? { bg: '#FEE2E2', border: '#FECACA', icon: '#EF4444' }
              : alert.type === 'warning'
              ? { bg: '#FFF7ED', border: '#FED7AA', icon: '#F97316' }
              : { bg: '#DBEAFE', border: '#BFDBFE', icon: '#0EA5E9' };

          return (
            <div 
              key={alert.id} 
              className="p-3 rounded-lg border"
              style={{ backgroundColor: styles.bg, borderColor: styles.border }}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: styles.icon }} />
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#111827' }}>{alert.title}</p>
                  <p style={{ color: '#4B5563' }}>{alert.message}</p>
                  <p style={{ color: '#6B7280' }} className="mt-1">{alert.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        className="w-full py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        style={{ color: '#4F46E5', backgroundColor: 'transparent' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EEF2FF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span>View All Alerts</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
