import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { LayoutDashboard, Info } from 'lucide-react';

export default function OfficerLayout() {
  const location = useLocation();

  const officerNavItems = [
    { label: 'Officer Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Officer Sub-header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 overflow-x-auto">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-800 shrink-0">
                Officer Portal
              </span>
              <nav className="flex items-center gap-1 shrink-0">
                {officerNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-rose-600 text-white shadow-2xs font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 text-xs text-rose-300 shrink-0">
              <Info className="w-3.5 h-3.5" />
              <span>Officer Module (Maintained by <strong>Kalai</strong>)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
