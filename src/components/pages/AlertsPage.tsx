'use client';

import { useState } from 'react';
import { Bell, AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

const allAlerts = [
  {
    id: 1,
    title: 'Critical: Low Liquidity Warning',
    message: 'Your cash balance has dropped below the recommended threshold of $50,000. Current balance: $42,300. Consider reviewing upcoming expenses and revenue projections.',
    severity: 'critical',
    category: 'Cashflow',
    timestamp: '2024-11-21 14:30',
    read: false,
  },
  {
    id: 2,
    title: 'Expense Spike Detected',
    message: 'Marketing expenses have increased by 45% compared to your 3-month average. Total spend this month: $18,200 vs average: $12,500.',
    severity: 'warning',
    category: 'Expenses',
    timestamp: '2024-11-20 09:15',
    read: false,
  },
  {
    id: 3,
    title: 'Unusual Transaction Pattern',
    message: 'AI detected an abnormal pattern in Premium Plan purchases. There has been a 78% increase in sales over the past week.',
    severity: 'warning',
    category: 'Revenue',
    timestamp: '2024-11-19 16:45',
    read: false,
  },
  {
    id: 4,
    title: 'Profit Margin Decline',
    message: 'Your overall profit margin has decreased from 39.2% to 37.1% this month. Primary driver: increased operational costs.',
    severity: 'warning',
    category: 'Profitability',
    timestamp: '2024-11-18 11:20',
    read: true,
  },
  {
    id: 5,
    title: 'Low Stock Alert: Product B',
    message: 'Product B - Starter Kit inventory is running low. Current stock: 89 units. Based on sales velocity, you have approximately 3 weeks of inventory remaining.',
    severity: 'info',
    category: 'Inventory',
    timestamp: '2024-11-17 08:00',
    read: true,
  },
  {
    id: 6,
    title: 'Invoice Payment Received',
    message: 'Client payment of $5,000 for Website Design project has been received via bank transfer.',
    severity: 'info',
    category: 'Revenue',
    timestamp: '2024-11-16 14:22',
    read: true,
  },
  {
    id: 7,
    title: 'Monthly Report Generated',
    message: 'Your November financial report is ready for review. Download it from the Reports section.',
    severity: 'info',
    category: 'System',
    timestamp: '2024-11-15 00:05',
    read: true,
  },
];

export function AlertsPage() {
  const [alerts, setAlerts] = useState(allAlerts);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredAlerts = filter === 'unread' ? alerts.filter((a) => !a.read) : alerts;

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return AlertCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-700',
        };
      case 'warning':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'text-orange-600',
          badge: 'bg-orange-100 text-orange-700',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700',
        };
    }
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-slate-900 mb-2">Alerts Center</h1>
          <p className="text-slate-600">Monitor important notifications and warnings</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-slate-600">Critical</p>
          </div>
          <p className="text-slate-900">{alerts.filter((a) => a.severity === 'critical').length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-slate-600">Warnings</p>
          </div>
          <p className="text-slate-900">{alerts.filter((a) => a.severity === 'warning').length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-slate-600">Info</p>
          </div>
          <p className="text-slate-900">{alerts.filter((a) => a.severity === 'info').length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-slate-600">Unread</p>
          </div>
          <p className="text-slate-900">{unreadCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'unread'
                ? 'bg-blue-100 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const Icon = getIcon(alert.severity);
          const styles = getSeverityStyles(alert.severity);

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-xl p-6 border-2 shadow-sm transition-all ${
                alert.read ? 'border-slate-200 opacity-75' : `${styles.border}`
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${styles.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${styles.icon}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-slate-900">{alert.title}</h3>
                      {!alert.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <p className="text-slate-700 mb-3">{alert.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full ${styles.badge}`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                      <span className="text-slate-500">{alert.category}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-500">{alert.timestamp}</span>
                    </div>

                    {!alert.read && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-slate-900 mb-2">All caught up!</h3>
          <p className="text-slate-600">You have no unread alerts at the moment.</p>
        </div>
      )}
    </div>
  );
}