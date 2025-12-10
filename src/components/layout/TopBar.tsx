'use client';

import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  businessName: string;
  onMenuClick: () => void;
}

export function TopBar({ businessName, onMenuClick }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div 
      className="sticky top-0 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40"
      style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #D1D5DB' }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg transition-colors"
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Menu className="w-6 h-6" style={{ color: '#4B5563' }} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search transactions, products, reports..."
            className="w-full pl-11 pr-4 py-2 rounded-lg focus:outline-none transition-all"
            style={{ 
              backgroundColor: '#F9FAFB',
              border: '1px solid #D1D5DB',
              color: '#111827'
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 0 0 2px #4F46E5';
              e.currentTarget.style.borderColor = '#4F46E5';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
          />
        </div>
      </div>
      
      {/* Mobile Search Icon */}
      <button 
        className="md:hidden p-2 rounded-lg transition-colors"
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Search className="w-5 h-5" style={{ color: '#4B5563' }} />
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Bell className="w-5 h-5" style={{ color: '#4B5563' }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#EF4444' }}></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl py-2" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}>
              <div className="px-4 py-2" style={{ borderBottom: '1px solid #D1D5DB' }}>
                <p style={{ color: '#111827' }}>Notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="px-4 py-3 cursor-pointer" style={{ borderBottom: '1px solid #F3F4F6' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EF4444' }}></div>
                    <div className="flex-1">
                      <p style={{ color: '#111827' }}>Low liquidity warning</p>
                      <p style={{ color: '#4B5563' }}>Cash balance is below recommended threshold</p>
                      <p style={{ color: '#6B7280' }} className="mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 cursor-pointer" style={{ borderBottom: '1px solid #F3F4F6' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#F97316' }}></div>
                    <div className="flex-1">
                      <p style={{ color: '#111827' }}>Expense spike detected</p>
                      <p style={{ color: '#4B5563' }}>Unusual spending in Marketing category</p>
                      <p style={{ color: '#6B7280' }} className="mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 cursor-pointer"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#0EA5E9' }}></div>
                    <div className="flex-1">
                      <p style={{ color: '#111827' }}>Monthly report ready</p>
                      <p style={{ color: '#4B5563' }}>Your November financial report is available</p>
                      <p style={{ color: '#6B7280' }} className="mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="text-right hidden sm:block">
              <p style={{ color: '#111827' }}>{businessName || 'My Business'}</p>
              <p style={{ color: '#6B7280' }}>Owner</p>
            </div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(to bottom right, #4F46E5, #6366F1)' }}
            >
              <span>{(businessName || 'MB').charAt(0)}</span>
            </div>
            <ChevronDown className="w-4 h-4 hidden sm:block" style={{ color: '#4B5563' }} />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}>
              <a href="#" className="block px-4 py-2 transition-colors" style={{ color: '#111827' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Profile Settings
              </a>
              <a href="#" className="block px-4 py-2 transition-colors" style={{ color: '#111827' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Business Settings
              </a>
              <a href="#" className="block px-4 py-2 transition-colors" style={{ color: '#111827' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Help & Support
              </a>
              <hr className="my-2" style={{ borderColor: '#D1D5DB' }} />
              <a href="#" className="block px-4 py-2 transition-colors" style={{ color: '#EF4444' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
