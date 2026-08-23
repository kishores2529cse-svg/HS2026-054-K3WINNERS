import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, PlusCircle, Menu, X, User, ChevronDown, LayoutDashboard, ShieldCheck, UserCheck } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Platform', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  CivicConnect
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-emerald-600 uppercase mt-0.5">
                  K3 WINNERS Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Quick Portal Access Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                onBlur={() => setTimeout(() => setRoleDropdownOpen(false), 200)}
                className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-emerald-700 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Modules & Dashboards</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Role Portals
                  </div>
                  <Link
                    to="/citizen/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>Citizen Dashboard</span>
                  </Link>
                  <Link
                    to="/officer/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-sky-600" />
                    <span>Officer Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Admin Dashboard</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/citizen/report">
              <Button variant="primary" size="sm" icon={PlusCircle}>
                Report Issue
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="sm">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/citizen/report">
              <Button variant="primary" size="sm" icon={PlusCircle}>
                Report
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Modules & Dashboards
            </div>
            <Link
              to="/citizen/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Citizen Portal</span>
            </Link>
            <Link
              to="/officer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              <UserCheck className="w-4 h-4 text-sky-600" />
              <span>Officer Portal</span>
            </Link>
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="outline" size="md" fullWidth>
                Log In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="secondary" size="md" fullWidth>
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
