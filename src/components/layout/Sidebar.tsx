'use client';

import {
  TrendingUp,
  LayoutDashboard,
  // Receipt,
  // Package,
  Sparkles,
  Bell,
  // FileText,
  // Database,
  Settings,
  PenSquare,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (page: any) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'input-data', label: 'Input Data', icon: PenSquare },
  // { id: 'transactions', label: 'Transactions', icon: Receipt },
  // { id: 'products', label: 'Products & Inventory', icon: Package },
  { id: 'insights', label: 'AI Insights', icon: Sparkles },
  { id: 'alerts', label: 'Alerts Center', icon: Bell },
  // { id: 'reports', label: 'Reports', icon: FileText },
  // { id: 'backup', label: 'Backup & Restore', icon: Database },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, isMobileOpen, onMobileClose }: SidebarProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNavigate = (page: any) => {
    onNavigate(page);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#F3F4F6", borderRight: "1px solid #D1D5DB" }}
      >
        {/* Logo */}
        <div className="p-6" style={{ borderBottom: "1px solid #D1D5DB" }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#4F46E5" }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 style={{ color: "#06132eff" }} className="text-[1rem]">
                  FinancePulse
                </h2>
                <p style={{ color: "#232e3dff" }}>Financial Intelligence</p>
              </div>
            </div>
            <button
              suppressHydrationWarning
              onClick={onMobileClose}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#E5E7EB")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <X className="w-5 h-5" style={{ color: "#4B5563" }} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: isActive ? "#4F46E5" : "transparent",
                    color: isActive ? "#FFFFFF" : "#1e1e29ff",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#E5E7EB";
                      e.currentTarget.style.color = "#111827";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#3a414dff";
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: "1px solid #D1D5DB" }}>
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: "#EEF2FF" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" style={{ color: "#4F46E5" }} />
              <p style={{ color: "#111827" }}>AI Features</p>
            </div>
            <p style={{ color: "#4B5563" }} className="mb-3">
              Unlock advanced forecasting and insights
            </p>
            <button
              className="w-full text-white py-2 rounded-lg transition-all"
              style={{ backgroundColor: "#4F46E5" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#4338CA")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#4F46E5")
              }
            >
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>
    </>
  );
}