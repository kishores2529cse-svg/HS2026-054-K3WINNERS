import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">CivicConnect</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Citizen Complaint Management & Resolution Platform. Empowering cities with transparent civic governance.
            </p>
            <div className="inline-block px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-medium text-emerald-400">
              Team K3 WINNERS Hackathon Project
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Platform Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link to="/citizen/report" className="hover:text-emerald-400 transition-colors">
                  Report Complaint
                </Link>
              </li>
              <li>
                <Link to="/citizen/dashboard" className="hover:text-emerald-400 transition-colors">
                  Citizen Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Role Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Role Modules
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/citizen/dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  Citizen Module <span className="text-[10px] text-slate-500">(Kishore)</span>
                </Link>
              </li>
              <li>
                <Link to="/officer/dashboard" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  Officer Dashboard <span className="text-[10px] text-slate-500">(Kalai)</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  Admin Dashboard <span className="text-[10px] text-slate-500">(Kanishk)</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors">
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Team / Hackathon Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Team K3 WINNERS
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <strong>Kishore S</strong> — Lead, Citizen UI & AI Integration
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                <strong>Kalai</strong> — Officer Dashboard Module
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <strong>Kanishk</strong> — Admin Analytics & Governance
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} K3 WINNERS – CivicConnect. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500 mx-1" /> for Hackathon 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
