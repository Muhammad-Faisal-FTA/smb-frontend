import { Search, Plus, ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white">D</span>
              </div>
              <span className="text-slate-900">Dashboard</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors">
                Overview
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                Projects
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                Analytics
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                Reports
              </a>
            </div>
          </div>

          {/* Search, Button, and Avatar */}
          <div className="flex items-center gap-4">
            {/* Search Field */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 w-full"
              />
            </div>

            {/* New Project Button */}
            <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:bg-slate-100 rounded-lg px-2 py-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                  <span>JD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600 hidden sm:block" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-100">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-slate-700 hover:bg-slate-100">
                    Team
                  </a>
                  <hr className="my-2 border-slate-200" />
                  <a href="#" className="block px-4 py-2 text-red-600 hover:bg-slate-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-2">
              <a href="#" className="text-slate-900 hover:text-blue-600 py-2">
                Overview
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 py-2">
                Projects
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 py-2">
                Analytics
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 py-2">
                Reports
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
