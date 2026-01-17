"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
} from "lucide-react";
import { getApiResponseS, patchApiResponseS } from "@/utils/ApiResponse";

/* =========================================================
   Types (Backend → Frontend Contract)
   ========================================================= */

type ApiNotification = {
  _id: string;
  type: "CRITICAL" | "WARNING" | "INFO";
  title: string;
  message: string;
  category: string;
  isRead: boolean;
  createdAt: string;
};

type AlertUI = {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  category: string;
  timestamp: string;
  read: boolean;
};

/* =========================================================
   Mapper (DTO Normalization)
   ========================================================= */

const mapApiToAlert = (n: ApiNotification): AlertUI => ({
  id: n._id,
  title: n.title,
  message: n.message,
  severity: n.type.toLowerCase() as "critical" | "warning" | "info",
  category: n.category,
  read: n.isRead,
  timestamp: new Date(n.createdAt).toLocaleString(),
});

/* =========================================================
   Component
   ========================================================= */

export function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertUI[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);

  const endPoint = "/notifications/";

  /* ================= Fetch Notifications ================= */

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchNotifications = async () => {
      try {
        const res = await getApiResponseS(endPoint, token);

        // const json = await res.json();
        const normalized = res.map(mapApiToAlert);

        setAlerts(normalized);
      } catch (err) {
        console.error("Notification fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  /* ================= Derived State ================= */

  const unreadCount = alerts.filter((a) => !a.read).length;

  const filteredAlerts =
    filter === "unread" ? alerts.filter((a) => !a.read) : alerts;

  /* ================= Actions ================= */

  const markAsRead = async (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );

    await fetch(`http://localhost:5000/api/v1/api/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("accessToken");
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));

    await fetch("http://localhost:5000/api/v1/notifications/read-all", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add the line below
        Authorization: `Bearer ${token}`,
      },

      credentials: "include",
    });
  };

  const dismissAlert = async (id: string) => {
    const endPoint = `/notifications/${id}/read`;
    const token = localStorage.getItem("accessToken");
    setAlerts((prev) => prev.filter((a) => a.id !== id));

    await patchApiResponseS(endPoint, token);
  };

  /* ================= UI Helpers ================= */

  const getIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return AlertCircle;
      case "warning":
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "text-red-600",
          badge: "bg-red-100 text-red-700",
        };
      case "warning":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          icon: "text-orange-600",
          badge: "bg-orange-100 text-orange-700",
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600",
          badge: "bg-blue-100 text-blue-700",
        };
    }
  };

  /* ================= Loading State ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Bell className="w-10 h-10 animate-pulse text-slate-400" />
      </div>
    );
  }

  /* ================= Render ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-slate-900">Alerts Center</h1>
          <p className="text-slate-600">
            Monitor important notifications and warnings
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          <CheckCircle className="w-5 h-5" />
          Mark All as Read
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Critical"
          value={alerts.filter((a) => a.severity === "critical").length}
          icon={<AlertCircle className="w-5 h-5 text-red-600" />}
          bg="bg-red-100"
        />
        <StatCard
          label="Warnings"
          value={alerts.filter((a) => a.severity === "warning").length}
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
          bg="bg-orange-100"
        />
        <StatCard
          label="Info"
          value={alerts.filter((a) => a.severity === "info").length}
          icon={<Info className="w-5 h-5 text-blue-600" />}
          bg="bg-blue-100"
        />
        <StatCard
          label="Unread"
          value={unreadCount}
          icon={<Bell className="w-5 h-5 text-purple-600" />}
          bg="bg-purple-100"
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg mr-2 ${
            filter === "all"
              ? "bg-blue-100 text-blue-700"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg ${
            filter === "unread"
              ? "bg-blue-100 text-blue-700"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const Icon = getIcon(alert.severity);
          const styles = getSeverityStyles(alert.severity);

          return (
            <div
              key={alert.id}
              className={`p-6 rounded-xl border-2 bg-white ${
                alert.read ? "border-slate-200 opacity-75" : styles.border
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 ${styles.bg} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${styles.icon}`} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-slate-900">{alert.title}</h3>
                    <button onClick={() => dismissAlert(alert.id)}>
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <p className="text-slate-700 mb-3">{alert.message}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-slate-500">
                      <span
                        className={`px-3 py-1 rounded-full ${styles.badge}`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <span>{alert.category}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>

                    {!alert.read && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
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
        <div className="text-center p-12 bg-white rounded-xl border">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <p className="text-slate-600">You are all caught up 🎉</p>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Small Stat Card Component
   ========================================================= */

function StatCard({
  label,
  value,
  icon,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <p className="text-slate-600">{label}</p>
      </div>
      <p className="text-slate-900">{value}</p>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { Bell, AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

// const allAlerts = [
//   {
//     id: 1,
//     title: 'Critical: Low Liquidity Warning',
//     message: 'Your cash balance has dropped below the recommended threshold of $50,000. Current balance: $42,300. Consider reviewing upcoming expenses and revenue projections.',
//     severity: 'critical',
//     category: 'Cashflow',
//     timestamp: '2024-11-21 14:30',
//     read: false,
//   },
//   {
//     id: 2,
//     title: 'Expense Spike Detected',
//     message: 'Marketing expenses have increased by 45% compared to your 3-month average. Total spend this month: $18,200 vs average: $12,500.',
//     severity: 'warning',
//     category: 'Expenses',
//     timestamp: '2024-11-20 09:15',
//     read: false,
//   },
//   {
//     id: 3,
//     title: 'Unusual Transaction Pattern',
//     message: 'AI detected an abnormal pattern in Premium Plan purchases. There has been a 78% increase in sales over the past week.',
//     severity: 'warning',
//     category: 'Revenue',
//     timestamp: '2024-11-19 16:45',
//     read: false,
//   },
//   {
//     id: 4,
//     title: 'Profit Margin Decline',
//     message: 'Your overall profit margin has decreased from 39.2% to 37.1% this month. Primary driver: increased operational costs.',
//     severity: 'warning',
//     category: 'Profitability',
//     timestamp: '2024-11-18 11:20',
//     read: true,
//   },
//   {
//     id: 5,
//     title: 'Low Stock Alert: Product B',
//     message: 'Product B - Starter Kit inventory is running low. Current stock: 89 units. Based on sales velocity, you have approximately 3 weeks of inventory remaining.',
//     severity: 'info',
//     category: 'Inventory',
//     timestamp: '2024-11-17 08:00',
//     read: true,
//   },
//   {
//     id: 6,
//     title: 'Invoice Payment Received',
//     message: 'Client payment of $5,000 for Website Design project has been received via bank transfer.',
//     severity: 'info',
//     category: 'Revenue',
//     timestamp: '2024-11-16 14:22',
//     read: true,
//   },
//   {
//     id: 7,
//     title: 'Monthly Report Generated',
//     message: 'Your November financial report is ready for review. Download it from the Reports section.',
//     severity: 'info',
//     category: 'System',
//     timestamp: '2024-11-15 00:05',
//     read: true,
//   },
// ];

// export function AlertsPage() {
//   const [alerts, setAlerts] = useState(allAlerts);
//   const [filter, setFilter] = useState<'all' | 'unread'>('all');

//   const filteredAlerts = filter === 'unread' ? alerts.filter((a) => !a.read) : alerts;

//   const markAsRead = (id: number) => {
//     setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
//   };

//   const markAllAsRead = () => {
//     setAlerts(alerts.map((a) => ({ ...a, read: true })));
//   };

//   const dismissAlert = (id: number) => {
//     setAlerts(alerts.filter((a) => a.id !== id));
//   };

//   const getIcon = (severity: string) => {
//     switch (severity) {
//       case 'critical':
//         return AlertCircle;
//       case 'warning':
//         return AlertTriangle;
//       default:
//         return Info;
//     }
//   };

//   const getSeverityStyles = (severity: string) => {
//     switch (severity) {
//       case 'critical':
//         return {
//           bg: 'bg-red-50',
//           border: 'border-red-200',
//           icon: 'text-red-600',
//           badge: 'bg-red-100 text-red-700',
//         };
//       case 'warning':
//         return {
//           bg: 'bg-orange-50',
//           border: 'border-orange-200',
//           icon: 'text-orange-600',
//           badge: 'bg-orange-100 text-orange-700',
//         };
//       default:
//         return {
//           bg: 'bg-blue-50',
//           border: 'border-blue-200',
//           icon: 'text-blue-600',
//           badge: 'bg-blue-100 text-blue-700',
//         };
//     }
//   };

//   const unreadCount = alerts.filter((a) => !a.read).length;

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-slate-900 mb-2">Alerts Center</h1>
//           <p className="text-slate-600">Monitor important notifications and warnings</p>
//         </div>
//         <button
//           onClick={markAllAsRead}
//           className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
//         >
//           <CheckCircle className="w-5 h-5" />
//           <span>Mark All as Read</span>
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//             </div>
//             <p className="text-slate-600">Critical</p>
//           </div>
//           <p className="text-slate-900">{alerts.filter((a) => a.severity === 'critical').length}</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//               <AlertTriangle className="w-5 h-5 text-orange-600" />
//             </div>
//             <p className="text-slate-600">Warnings</p>
//           </div>
//           <p className="text-slate-900">{alerts.filter((a) => a.severity === 'warning').length}</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <Info className="w-5 h-5 text-blue-600" />
//             </div>
//             <p className="text-slate-600">Info</p>
//           </div>
//           <p className="text-slate-900">{alerts.filter((a) => a.severity === 'info').length}</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <Bell className="w-5 h-5 text-purple-600" />
//             </div>
//             <p className="text-slate-600">Unread</p>
//           </div>
//           <p className="text-slate-900">{unreadCount}</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-lg transition-colors ${
//               filter === 'all'
//                 ? 'bg-blue-100 text-blue-700'
//                 : 'text-slate-600 hover:bg-slate-100'
//             }`}
//           >
//             All Alerts ({alerts.length})
//           </button>
//           <button
//             onClick={() => setFilter('unread')}
//             className={`px-4 py-2 rounded-lg transition-colors ${
//               filter === 'unread'
//                 ? 'bg-blue-100 text-blue-700'
//                 : 'text-slate-600 hover:bg-slate-100'
//             }`}
//           >
//             Unread ({unreadCount})
//           </button>
//         </div>
//       </div>

//       {/* Alerts List */}
//       <div className="space-y-3">
//         {filteredAlerts.map((alert) => {
//           const Icon = getIcon(alert.severity);
//           const styles = getSeverityStyles(alert.severity);

//           return (
//             <div
//               key={alert.id}
//               className={`bg-white rounded-xl p-6 border-2 shadow-sm transition-all ${
//                 alert.read ? 'border-slate-200 opacity-75' : `${styles.border}`
//               }`}
//             >
//               <div className="flex items-start gap-4">
//                 <div className={`w-12 h-12 ${styles.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
//                   <Icon className={`w-6 h-6 ${styles.icon}`} />
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex items-center gap-3">
//                       <h3 className="text-slate-900">{alert.title}</h3>
//                       {!alert.read && (
//                         <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => dismissAlert(alert.id)}
//                       className="p-1 hover:bg-slate-100 rounded transition-colors"
//                     >
//                       <X className="w-5 h-5 text-slate-400" />
//                     </button>
//                   </div>

//                   <p className="text-slate-700 mb-3">{alert.message}</p>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className={`px-3 py-1 rounded-full ${styles.badge}`}>
//                         {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
//                       </span>
//                       <span className="text-slate-500">{alert.category}</span>
//                       <span className="text-slate-500">•</span>
//                       <span className="text-slate-500">{alert.timestamp}</span>
//                     </div>

//                     {!alert.read && (
//                       <button
//                         onClick={() => markAsRead(alert.id)}
//                         className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         Mark as Read
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredAlerts.length === 0 && (
//         <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
//           <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//           <h3 className="text-slate-900 mb-2">All caught up!</h3>
//           <p className="text-slate-600">You have no unread alerts at the moment.</p>
//         </div>
//       )}
//     </div>
//   );
// }
