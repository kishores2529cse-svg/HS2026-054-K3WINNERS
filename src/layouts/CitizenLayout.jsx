import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { LayoutDashboard, PlusCircle, FileText, UserCheck } from 'lucide-react';

export default function CitizenLayout() {
  const location = useLocation();

  const citizenNavItems = [
    { label: 'Overview', path: '/citizen/dashboard', icon: LayoutDashboard },
    { label: 'Report Issue', path: '/citizen/report', icon: PlusCircle },
    { label: 'My Complaints', path: '/citizen/complaints', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Citizen Secondary Portal Bar */}
      <div className="bg-white border-b border-slate-200/90 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 shrink-0">
                Citizen Portal
              </span>
              <nav className="flex items-center gap-1 shrink-0">
                {citizenNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                        active
                          ? 'bg-rose-600 text-white shadow-xs shadow-rose-600/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 shrink-0">
              <UserCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>Logged in as <strong>Citizen</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
