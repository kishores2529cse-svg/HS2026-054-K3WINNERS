import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, UserCheck, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('citizen'); // citizen | officer | admin
  const [email, setEmail] = useState('citizen@civicconnect.gov');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'citizen') {
      setEmail('citizen@civicconnect.gov');
    } else if (role === 'officer') {
      setEmail('officer.kalai@civicconnect.gov');
    } else {
      setEmail('admin.kanishk@civicconnect.gov');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'citizen') {
        navigate('/citizen/dashboard');
      } else if (selectedRole === 'officer') {
        navigate('/officer/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold shadow-md shadow-rose-500/25">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tight">CivicConnect</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to access your portal and manage civic complaints</p>
        </div>

        <Card className="shadow-lg border border-slate-200 rounded-2xl bg-white">
          
          {/* Role Selection Tabs */}
          <div className="mb-6 space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
              Select Portal Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleRoleSelect('citizen')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === 'citizen'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 mb-0.5" />
                <span>Citizen</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('officer')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === 'officer'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 mb-0.5" />
                <span>Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mb-0.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-rose-600 focus:ring-rose-500" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="font-bold text-rose-600 hover:text-rose-700">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
              className="mt-2 shadow-md shadow-rose-600/25"
            >
              Sign In to {selectedRole.toUpperCase()} Portal
            </Button>
          </form>

          {/* Quick Mock Notice */}
          <div className="mt-5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>Quick Prototype Access:</strong> Any credentials will sign in directly to the chosen portal role.
            </div>
          </div>
        </Card>

        {/* Register Link */}
        <p className="text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-rose-600 hover:text-rose-700">
            Register for Free
          </Link>
        </p>

      </div>
    </div>
  );
}
