import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Info } from 'lucide-react';

export default function AdminLayout() {
  useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Admin Sub-header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 overflow-x-auto">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-800 shrink-0">
                Admin Portal
              </span>
              <span className="text-xs text-slate-300">
                Governance & Analytics Command Center
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-rose-300 shrink-0">
              <Info className="w-3.5 h-3.5" />
              <span>Admin Module (Maintained by <strong>Kanishk</strong>)</span>
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
