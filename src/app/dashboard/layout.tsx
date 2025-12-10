'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get business name from localStorage
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('businessName') || 'My Business';
      setBusinessName(name);
    }
  }, []);

  const getCurrentPage = () => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname === '/dashboard/input-data') return 'input-data';
    if (pathname === '/dashboard/transactions') return 'transactions';
    if (pathname === '/dashboard/products') return 'products';
    if (pathname === '/dashboard/insights') return 'insights';
    if (pathname === '/dashboard/alerts') return 'alerts';
    if (pathname === '/dashboard/reports') return 'reports';
    if (pathname === '/dashboard/backup') return 'backup';
    if (pathname === '/dashboard/settings') return 'settings';
    return 'dashboard';
  };

  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      router.push('/dashboard');
    } else {
      router.push(`/dashboard/${page}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        currentPage={getCurrentPage()}
        onNavigate={handleNavigate}
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-64">
        <TopBar
          businessName={businessName}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
